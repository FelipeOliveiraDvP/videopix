<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
  /**
   * Send a new email verification notification.
   */
  public function store(Request $request): RedirectResponse
  {
    $route_to_redirect = $request->user()->role === 'admin'
      ? 'admin.dashboard'
      : 'customer.home';

    if ($request->user()->hasVerifiedEmail()) {
      return redirect()->intended(route($route_to_redirect, absolute: false));
    }

    $request->user()->sendEmailVerificationNotification();

    return back()->with('status', 'verification-link-sent');
  }
}
