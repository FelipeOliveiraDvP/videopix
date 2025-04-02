<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
  /**
   * Display the email verification prompt.
   */
  public function __invoke(Request $request): RedirectResponse|Response
  {
    $route_to_redirect = $request->user()->role === 'admin'
      ? 'admin.dashboard'
      : 'customer.home';

    return $request->user()->hasVerifiedEmail()
      ? redirect()->intended(route($route_to_redirect, absolute: false))
      : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
  }
}
