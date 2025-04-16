<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\UserVideo;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class BalanceController extends Controller
{
  /**
   * Display the list of balances.
   */
  public function index(): Response
  {
    $transactions = Transaction::with('user:id,name')
      ->orderBy('created_at', 'desc')
      ->paginate(100);

    return Inertia::render('Admin/Balance', [
      'transactions' => $transactions,
    ]);
  }

  /**
   * Approve a customer withdraw.
   */
  public function approve(Transaction $transaction): RedirectResponse
  {
    if ($transaction->transaction_type == 'withdraw' && $transaction->status == 'pending') {
      $transaction->update([
        'status' => 'completed',
      ]);
      $transaction->user->balance->subtract($transaction->amount);

      return Redirect::route('admin.balance')
        ->with('success', 'Saque aprovado com sucesso.');
    }

    return Redirect::route('admin.balance')
      ->with('error', 'Ocorreu algum erro ao aprovar o saque.');
  }

  /**
   * Reject a customer withdraw.
   */
  public function reject(Transaction $transaction): RedirectResponse
  {
    if ($transaction->transaction_type == 'withdraw' && $transaction->status == 'pending') {
      $transaction->update([
        'status' => 'failed',
      ]);

      return Redirect::route('admin.balance')
        ->with('success', 'Saque recusado com sucesso.');
    }

    return Redirect::route('admin.balance')
      ->with('error', 'Ocorreu algum erro ao recusar o saque.');
  }

  /**
   * Display the customer list of balances.
   */
  public function customerBalance(): Response
  {
    $views_count = UserVideo::where('user_id', Auth::id())
      ->where('watched', true)
      ->count();

    $transactions = Transaction::where('user_id', Auth::id())
      ->orderBy('created_at', 'desc')
      ->paginate(100);

    return Inertia::render('Customer/Balance', [
      'views_count' => $views_count,
      'balance' => Auth::user()->balance,
      'transactions' => $transactions,
    ]);
  }
}
