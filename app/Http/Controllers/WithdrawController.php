<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Transaction;
use App\Models\UserPackage;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class WithdrawController extends Controller
{
  /**
   * Display the withdraw form.
   */
  public function index(): Response
  {
    // Calcular o valor total de transações que o usuário fez essa semana
    $total_transactions = Auth::user()->transactions()
      ->where('created_at', '>=', now()->startOfWeek())
      ->where('transaction_type', 'withdraw')
      ->where('status', 'completed')
      ->sum('amount');

    $current_package = Package::where('id', function ($query) {
      $query->select('package_id')
        ->from('user_packages')
        ->where('user_id', Auth::id())
        ->limit(1);
    })->first();

    return Inertia::render('Customer/Withdraw', [
      'total_transactions' => $total_transactions,
      'current_package' => $current_package,
      'can_withdraw' => can_withdraw()
    ]);
  }

  /**
   * Store a new customer withdraw.
   */
  public function store(Request $request): RedirectResponse
  {
    if (!can_withdraw()) {
      return Redirect::route('customer.packages')
        ->with('error', 'O seu pacote está expirado ou você não tem saldo suficiente para fazer o saque.');
    }

    $request->validate([
      'amount' => 'required|numeric|min:0.01',
    ], [
      'amount.required' => 'O valor do saque é obrigatório.',
      'amount.numeric' => 'O valor do saque deve ser um número.',
      'amount.min' => 'O valor do saque deve ser maior que R$ 0,01',
    ]);

    $requestAmount = $request->input('amount');
    $user = Auth::user();
    $userBalance = $user->balance ? $user->balance->amount : 0;

    // Pega o pacote ativo
    $userPackage = UserPackage::with('package')
      ->where('user_id', $user->id)
      ->where('expires_at', '>=', now())
      ->first();

    if (!$userPackage) {
      return Redirect::route('customer.packages')
        ->with('error', 'Você não possui um pacote ativo.');
    }

    $package = $userPackage->package;
    $packageLimit = $package->price * ($package->withdraw_percentage / 100);

    // Soma dos saques da semana
    $startOfWeek = Carbon::now()->startOfWeek();
    $endOfWeek = Carbon::now()->endOfWeek();

    $withdrawnThisWeek = Transaction::where('user_id', $user->id)
      ->where('transaction_type', 'withdraw')
      ->where('status', 'completed')
      ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
      ->sum('amount');

    if ($requestAmount > $userBalance) {
      return Redirect::route('customer.withdraw')
        ->with('error', 'Você não tem saldo suficiente para fazer o saque.');
    }

    if ($packageLimit > ($withdrawnThisWeek + $requestAmount)) {
      return Redirect::route('customer.withdraw')
        ->with('error', 'Você atingiu o limite de saque semanal permitido pelo seu pacote.');
    }

    // Cria a transação
    $transaction = Transaction::create([
      'user_id' => $user->id,
      'amount' => $requestAmount,
      'transaction_type' => 'withdraw',
      'status' => 'pending', // Coloca como pending pra ser aprovado depois
      'item_id' => 0,
    ]);

    app(\App\Services\ExternalLogService::class)->newWithdraw(
      $transaction->id,
      $user->name,
      $user->customer->cpf,
      $requestAmount
    );

    return Redirect::route('customer.withdraw.success')
      ->with('thank_you', 'withdraw');
  }

  /**
   * Display the thank you page.
   */
  public function thankYou(): Response
  {
    return Inertia::render('Customer/ThankYou');
  }
}
