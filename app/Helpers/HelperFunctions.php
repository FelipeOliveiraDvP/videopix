<?php

use App\Models\Package;
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

/**
 * Get the package of the authenticated user.
 *
 * This function retrieves the package associated with the currently
 * authenticated user. If the user is not authenticated, it returns null.
 *
 * @return mixed | null The package of the authenticated user or null if not authenticated.
 */
function get_user_package()
{
  if (Auth::user() == null) return null;

  return Auth::user()->package;
}

/**
 * Remove all non-numeric characters from a string.
 *
 * This function takes a string as input and removes all characters
 * that are not digits (0-9). It uses a regular expression to perform
 * the replacement. The resulting string contains only numeric characters.
 *
 * @param string $string The input string to be processed.
 * @return string The input string with all non-numeric characters removed.
 */
function only_numbers($string)
{
  return preg_replace('/\D/', '', $string);
}

/**
 * Check if the authenticated user can withdraw.
 *
 * This function checks if the currently authenticated user is allowed
 * to withdraw funds based on their transaction history and package limits.
 *
 * @return bool True if the user can withdraw, false otherwise.
 */
function can_withdraw()
{
  if (Auth::user() == null) return false;

  $total_transactions = Auth::user()->transactions()
    ->where('transaction_type', 'withdraw')
    ->where('created_at', '>=', now()->startOfWeek())
    ->sum('amount');

  $current_package = Package::where('id', function ($query) {
    $query->select('package_id')
      ->from('user_packages')
      ->where('user_id', Auth::id())
      ->limit(1);
  })->first();

  if (!$current_package) return false;

  $limit = $current_package->price * $current_package->withdraw_percentage;

  return $total_transactions < $limit;
}
