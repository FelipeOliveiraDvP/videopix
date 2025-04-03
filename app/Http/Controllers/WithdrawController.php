<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
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
