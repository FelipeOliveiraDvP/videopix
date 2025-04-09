<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Transaction;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
  /**
   * Display the checkout form.
   */
  public function index(Package $package): Response
  {
    // TODO: Chamar a service de pagamento

    $transaction = Transaction::where('user_id', Auth::id())
      ->where('item_id', $package->id)
      ->where('transaction_type', 'deposit')
      ->where('status', 'pending')
      ->first();

    if (!$transaction) {
      Transaction::create([
        'user_id' => Auth::id(),
        'amount' => $package->price,
        'transaction_type' => 'deposit',
        'item_id' => $package->id,
      ]);
    } else {
      if ($transaction->status == 'completed') {
        return Inertia::render('Customer/ThankYou', [
          'thank_you' => 'checkout',
        ]);
      }
    }

    return Inertia::render('Customer/Checkout', [
      'item' => $package,
      'pix_code' => '1234567890',
      'pix_qr_code' => "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIXCODE",
    ]);
  }


  /**
   * Display the thank you page.
   */
  public function thankYou(): Response
  {
    return Inertia::render('Customer/ThankYou', [
      'thank_you' => 'checkout',
    ]);
  }
}
