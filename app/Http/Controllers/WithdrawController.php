<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Transaction;
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

    $user_balance = Auth::user()->balance ? Auth::user()->balance->amount : 0;
    $request_amount = $request->input('amount');

    if ($request_amount > $user_balance) {
      return Redirect::route('customer.withdraw')
        ->with('error', 'Você não tem saldo suficiente para fazer o saque.');
    }

    Transaction::create([
      'user_id' => Auth::id(),
      'amount' => $request_amount,
      'transaction_type' => 'withdraw',
      'item_id' => 0,
    ]);

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
