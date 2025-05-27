<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\WithdrawApprovedEmail;
use App\Models\Customer;
use App\Models\Transaction;
use App\Models\UserPackage;
use App\Models\UserVideo;
use App\Services\BrevoService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class BalanceController extends Controller
{
  public function index(Request $request): Response
  {
    $filters = $request->only('name', 'cpf', 'type', 'status', 'created_at', 'external_id', 'amount');

    $transactions = Transaction::with('user:id,name', 'user.customer:id,user_id,cpf,pix') // Carrega User + Customer juntos
      ->when(
        $filters['name'] ?? null,
        fn($query, $name) =>
        $query->whereHas(
          'user',
          fn($q) =>
          $q->where('name', 'like', "%{$name}%")
        )
      )
      ->when(
        $filters['cpf'] ?? null,
        fn($query, $cpf) =>
        $query->whereHas(
          'user.customer',
          fn($q) =>
          $q->where('cpf', 'like', "%{$cpf}%")
        )
      )
      ->when(
        $filters['type'] ?? null,
        fn($query, $type) =>
        $query->where('transaction_type', $type)
      )
      ->when(
        $filters['status'] ?? null,
        fn($query, $status) =>
        $query->where('status', $status === 'success' ? 'completed' : $status)
      )
      ->when(
        $filters['created_at'] ?? null,
        fn($query, $date) =>
        $query->whereDate('created_at', $date)
      )
      ->when(
        $filters['external_id'] ?? null,
        fn($query, $externalId) =>
        $query->where('external_id', 'like', "%{$externalId}%")
      )
      ->when(
        $filters['amount'] ?? null,
        fn($query, $amount) =>
        $query->where('amount', $amount)
      )
      ->orderBy('created_at', 'desc')
      ->paginate(100)
      ->withQueryString();

    return Inertia::render('Admin/Balance', [
      'filters' => $filters,
      'transactions' => $transactions,
    ]);
  }

  /**
   * Approve a customer withdraw.
   */
  public function approve(Transaction $transaction, BrevoService $brevo): RedirectResponse
  {
    $customer = Customer::where('user_id', $transaction->user_id)->first();

    if ($transaction->transaction_type == 'withdraw' && $transaction->status == 'pending') {
      $transaction->update([
        'status' => 'completed',
      ]);

      $transaction->user->balance->subtract($transaction->amount);

      $amount = $transaction->amount;
      $deposit_date = now();


      if (app()->environment('production')) {
        $brevo->sendMail([
          'subject' => 'Seu saque foi aprovado!',
          'htmlContent' => view('emails.withdraw', [
            'customer' => $customer,
            'amount' => $amount,
            'deposit_date' => $deposit_date,
          ])->render(),
          'to' => [[
            'email' => $customer->user->email,
            'name' => $customer->user->name,
          ]],
        ]);
      } else {
        Mail::to($customer->user->email)->send(new WithdrawApprovedEmail(
          $customer,
          $amount,
          $deposit_date
        ));
      }

      return Redirect::route('admin.balance')
        ->with('success', 'Saque aprovado com sucesso.');
    }

    if ($transaction->transaction_type == 'deposit' && $transaction->status == 'pending') {
      $transaction->update([
        'status' => 'completed',
      ]);

      $user_package = UserPackage::where('user_id', $customer->user_id)
        ->where('expires_at', '>=', now())
        ->first();

      if ($user_package) {
        $user_package->update([
          'package_id' => $transaction->item_id,
          'expires_at' => now()->addDays(30),
        ]);
      } else {
        UserPackage::create([
          'user_id' => $customer->user_id,
          'package_id' => $transaction->item_id,
          'expires_at' => now()->addDays(30),
        ]);
      }

      return Redirect::route('admin.balance')
        ->with('success', 'Compra aprovada com sucesso.');
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
