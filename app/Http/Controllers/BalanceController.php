<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserVideo;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BalanceController extends Controller
{
  /**
   * Display the list of balances.
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Balance');
  }

  /**
   * Approve a customer withdraw.
   */
  public function approve(): Response
  {
    return Inertia::render('Admin/Balance');
  }

  /**
   * Reject a customer withdraw.
   */
  public function reject(): Response
  {
    return Inertia::render('Admin/Balance');
  }

  /**
   * Display the customer list of balances.
   */
  public function customerBalance(): Response
  {
    $views_count = UserVideo::where('user_id', Auth::id())
      ->where('watched', true)
      ->count();

    return Inertia::render('Customer/Balance', [
      'views_count' => $views_count,
      'balance' => Auth::user()->balance,
    ]);
  }
}
