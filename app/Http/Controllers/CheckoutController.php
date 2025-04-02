<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
  /**
   * Display the checkout form.
   */
  public function index(): Response
  {
    return Inertia::render('Customer/Checkout');
  }

  /**
   * Display the thank you page.
   */
  public function thankYou(): Response
  {
    return Inertia::render('Customer/ThankYou');
  }
}
