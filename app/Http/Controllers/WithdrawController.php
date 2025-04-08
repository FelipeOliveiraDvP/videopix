<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class WithdrawController extends Controller
{
  /**
   * Display the withdraw form.
   */
  public function index(): Response
  {
    return Inertia::render('Customer/Withdraw');
  }

  /**
   * Store a new customer withdraw.
   */
  public function store(): RedirectResponse
  {
    $cutomer_packages = Auth::user()->customer->packages;

    if (empty($cutomer_packages)) {
      return Redirect::route('customer.packages')
        ->with('error', 'Você precisa contratar um pacote para solicitar o saque.');
    }

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
