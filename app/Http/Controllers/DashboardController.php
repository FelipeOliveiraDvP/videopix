<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
  /**
   * Display the admin dashboard.
   */
  public function index(): Response
  {
    $last6Months = $this->getLastMonths(6);
    $last12Months = $this->getLastMonths(12);

    $depositLast6Months = collect($last6Months)->map(function ($m) {
      $total = Transaction::where('transaction_type', 'deposit')
        ->where('status', 'completed')
        ->whereYear('created_at', $m['year'])
        ->whereMonth('created_at', $m['month'])
        ->sum('amount');

      return [
        'date' => $m['label'],
        'total' => $total,
      ];
    });

    $withdrawalsLast6Months = collect($last6Months)->map(function ($m) {
      $total = Transaction::where('transaction_type', 'withdraw')
        ->where('status', 'completed')
        ->whereYear('created_at', $m['year'])
        ->whereMonth('created_at', $m['month'])
        ->sum('amount');

      return [
        'date' => $m['label'],
        'total' => $total,
      ];
    });

    $balanceLast12Months = collect($last12Months)->map(function ($m) {
      $deposits = Transaction::where('transaction_type', 'deposit')
        ->where('status', 'completed')
        ->whereYear('created_at', $m['year'])
        ->whereMonth('created_at', $m['month'])
        ->sum('amount');

      $withdrawals = Transaction::where('transaction_type', 'withdraw')
        ->where('status', 'completed')
        ->whereYear('created_at', $m['year'])
        ->whereMonth('created_at', $m['month'])
        ->sum('amount');

      return [
        'date' => $m['label'],
        'total' => $deposits - $withdrawals,
      ];
    });

    $depositsByPackage = Transaction::selectRaw('item_id, SUM(amount) as total')
      ->where('transaction_type', 'deposit')
      ->where('status', 'completed')
      ->groupBy('item_id')
      ->with('item') // relação com Package
      ->get()
      ->map(function ($row) {
        return [
          'package' => optional($row->item)->name ?? 'Pacote desconhecido',
          'total' => $row->total,
        ];
      });

    $clientsByPackage = DB::table('user_packages')
      ->join('packages', 'user_packages.package_id', '=', 'packages.id')
      ->select('packages.name as package', DB::raw('count(user_packages.user_id) as total'))
      ->groupBy('packages.name')
      ->get();

    return Inertia::render('Admin/Dashboard', [
      'totalDeposits' => Transaction::where('transaction_type', 'deposit')->where('status', 'completed')->sum('amount'),
      'totalWithdrawals' => Transaction::where('transaction_type', 'withdraw')->where('status', 'completed')->sum('amount'),
      'totalVideosWatched' => DB::table('user_videos')->count(),
      'depositLast6Months' => $depositLast6Months,
      'withdrawalsLast6Months' => $withdrawalsLast6Months,
      'balanceLast12Months' => $balanceLast12Months,
      'depositsByPackage' => $depositsByPackage,
      'clientsByPackage' => $clientsByPackage,
    ]);
  }


  /**
   * Get the last months for the dashboard.
   *
   * @param int $count The number of months to retrieve.
   * @return array An array of months with their labels and years.
   */
  private function getLastMonths(int $count = 6): array
  {
    $months = [];
    $date = Carbon::now()->locale('pt_BR');

    for ($i = $count - 1; $i >= 0; $i--) {
      $current = $date->copy()->subMonthsNoOverflow($i);
      $months[] = [
        'month' => $current->month,
        'year' => $current->year,
        'label' => ucfirst($current->translatedFormat('F')),
      ];
    }

    return $months;
  }
}
