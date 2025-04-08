<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * Get the total count of users.
 *
 * This function retrieves the total number of users in the database
 * by utilizing the `count` method on the `User` model.
 *
 * @return int The total number of users.
 */
function users_count()
{
  return User::count();
}

/**
 * Get the home route for the authenticated user.
 *
 * This function determines the appropriate home route for the currently
 * authenticated user based on their role. If the user's role is 'admin',
 * it returns the route name for the admin dashboard. Otherwise, it returns
 * the route name for the customer home page.
 *
 * @return string The route name for the user's home page.
 */
function get_user_home()
{
  if (Auth::user() == null) return 'login';

  return Auth::user()->role == 'admin'
    ? 'admin.dashboard'
    : 'customer.home';
}

/**
 * Get the balance of the authenticated user.
 *
 * This function retrieves the balance amount for the currently
 * authenticated user. If the user is not authenticated, it returns 0.
 *
 * @return float The balance amount of the authenticated user.
 */
function get_user_balance()
{
  if (Auth::user() == null) return 0;

  return Auth::user()->balance ? Auth::user()->balance->amount : 0;
}


/**
 * Get the PIX key of the authenticated user.
 *
 * @return string The PIX key of the authenticated user.
 */
function get_user_pix()
{
  if (Auth::user() == null) return '';

  return Auth::user()->customer ? Auth::user()->customer->pix : '';
}
