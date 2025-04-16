<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Transaction;
use App\Services\Payment\GhostPaymentService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
  /**
   * Create a new transaction and redirect to the checkout page.
   */
  public function store(Package $package): RedirectResponse
  {
    $gateway = new GhostPaymentService();
    $payment = $gateway->create(
      $package->price,
      [
        'id' => Auth::id(),
        'name' => Auth::user()->name,
        'email' => Auth::user()->email,
        'phone' => Auth::user()->customer->phone,
        'cpf' => Auth::user()->customer->cpf,
      ],
      [
        'id' => $package->id,
        'title' => $package->name,
      ]
    );

    if ($payment['status'] != 'success') {
      return redirect()->back()
        ->with('error', 'Erro ao realizar o checkout. Tente novamente.');
    }

    return redirect()->route('customer.checkout.edit', [
      'package' => $package,
    ]);
  }

  /**
   * Display the checkout form.
   */
  public function edit(Package $package): Response
  {
    $transaction = Transaction::where('user_id', Auth::id())
      ->where('item_id', $package->id)
      ->where('transaction_type', 'deposit')
      ->where('status', 'pending')
      ->first();

    return Inertia::render('Customer/Checkout', [
      'item' => $package,
      'pix_code' => $transaction->pix_code,
      'pix_qrcode' => $transaction->pix_qrcode,
    ]);
  }

  /**
   * Verify the transaction status.
   */
  public function status(Package $package): RedirectResponse
  {
    $transaction = Transaction::where('user_id', Auth::id())
      ->where('item_id', $package->id)
      ->where('transaction_type', 'deposit')
      ->where('status', 'completed')
      ->first();

    if ($transaction) {
      return redirect()->route('customer.checkout.success', [
        'package' => $package,
      ])->with('thank_you', 'checkout');
    }

    return redirect()->back();
  }

  /**
   * Display the thank you page.
   */
  public function thankYou(): Response
  {
    return Inertia::render('Customer/ThankYou');
  }
}
