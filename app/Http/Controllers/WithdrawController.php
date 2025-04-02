<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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
  public function store(): Response
  {
    return Inertia::render('Customer/Withdraw');
  }

  /**
   * Display the thank you page.
   */
  public function thankYou(): Response
  {
    return Inertia::render('Customer/ThankYou');
  }
}
