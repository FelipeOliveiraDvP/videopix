<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\WithdrawController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
  // Admin Routes
  Route::prefix('admin')->middleware('role:admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
      ->name('admin.dashboard');

    // Customers
    Route::get('/customers', [CustomerController::class, 'index'])
      ->name('admin.customers.index');

    Route::get('/customers/{customer}/edit', [CustomerController::class, 'edit'])
      ->name('admin.customers.edit');

    Route::post('/customers', [CustomerController::class, 'store'])
      ->name('admin.customers.store');

    Route::put('/customers/{customer}', [CustomerController::class, 'update'])
      ->name('admin.customers.update');

    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])
      ->name('admin.customers.destroy');

    // Packages
    Route::get('/packages', [PackageController::class, 'index'])
      ->name('admin.packages.index');

    Route::get('/packages/{package}/edit', [PackageController::class, 'edit'])
      ->name('admin.packages.edit');

    Route::put('/packages/{package}', [PackageController::class, 'update'])
      ->name('admin.packages.update');

    // Videos
    Route::get('/videos', [VideoController::class, 'index'])
      ->name('admin.videos.index');

    Route::get('/videos/create', [VideoController::class, 'create'])
      ->name('admin.videos.create');

    Route::post('/videos', [VideoController::class, 'store'])
      ->name('admin.videos.store');

    Route::get('/videos/{video}/edit', [VideoController::class, 'edit'])
      ->name('admin.videos.edit');

    Route::put('/videos/{video}', [VideoController::class, 'update'])
      ->name('admin.videos.update');

    Route::delete('/videos/{video}', [VideoController::class, 'destroy'])
      ->name('admin.videos.destroy');

    // Balance
    Route::get('/balances', [BalanceController::class, 'index'])
      ->name('admin.balance');

    Route::patch('/balances/{balance}/approve', [BalanceController::class, 'approve'])
      ->name('admin.balance.approve');

    Route::patch('/balances/{balance}/reject', [BalanceController::class, 'reject'])
      ->name('admin.balance.reject');
  });

  // Customer routes
  Route::middleware('role:customer')->group(function () {
    // Videos
    Route::get('/', [VideoController::class, 'customerVideos'])
      ->name('customer.home');

    Route::get('/{video}/watch', [VideoController::class, 'watch'])
      ->name('customer.videos.watch');

    Route::patch('/{video}/progress', [VideoController::class, 'progress'])
      ->name('customer.videos.progress');

    Route::post('/{video}/watched', [VideoController::class, 'watched'])
      ->name('customer.videos.watched');

    // Balance
    Route::get('/balances', [BalanceController::class, 'customerBalance'])
      ->name('customer.balance');

    // Packages
    Route::get('/packages', [PackageController::class, 'customerPackages'])
      ->name('customer.packages');

    // Withdraw
    Route::get('/withdraw', [WithdrawController::class, 'index'])
      ->name('customer.withdraw');

    Route::post('/withdraw', [WithdrawController::class, 'store'])
      ->name('customer.withdraw.store');

    Route::get('/withdraw/thank-you', [WithdrawController::class, 'thankYou'])
      ->name('customer.withdraw.success');

    // Checkout
    Route::get('/checkout/{package}', [CheckoutController::class, 'index'])
      ->name('customer.checkout');

    Route::get('/checkout/{package}/success', [CheckoutController::class, 'thankYou'])
      ->name('customer.checkout.success');
  });

  // Profile
  Route::get('/profile', [ProfileController::class, 'edit'])
    ->name('profile.edit');

  Route::patch('/profile', [ProfileController::class, 'update'])
    ->name('profile.update');

  Route::delete('/profile', [ProfileController::class, 'destroy'])
    ->name('profile.destroy');
});

// TODO: Public route for payment gateway
// Route::post('/webhook', [PaymentController::class, 'webhook']);

require __DIR__ . '/auth.php';
