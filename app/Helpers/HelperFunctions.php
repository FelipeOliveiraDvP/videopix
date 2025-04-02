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
  if (Auth::user() === null) return 'login';

  return Auth::user()->role === 'admin'
    ? 'admin.dashboard'
    : 'customer.home';
}
