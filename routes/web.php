<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
  // Admin Routes
  Route::prefix('admin')->middleware('role:admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
      return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // Customers
    Route::get('/customers', function () {
      return Inertia::render('Admin/Customers/Index');
    })->name('admin.customers.index');

    Route::get('/customers/{customer}/edit', function () {
      return Inertia::render('Admin/Customers/Edit');
    })->name('admin.customers.edit');

    Route::post('/customers', function () {
      return Inertia::render('Admin/Customers/Index');
    })->name('admin.customers.store');

    Route::post('/customers/{customer}', function () {
      return Inertia::render('Admin/Customers/Edit');
    })->name('admin.customers.update');

    Route::delete('/customers/{customer}', function () {
      return Inertia::render('Admin/Customers/Index');
    })->name('admin.customers.destroy');

    // Packages
    Route::get('/packages', function () {
      return Inertia::render('Admin/Packages/Index');
    })->name('admin.packages.index');

    Route::get('/packages/{package}/edit', function () {
      return Inertia::render('Admin/Packages/Edit');
    })->name('admin.packages.edit');

    Route::put('/packages/{package}', function () {
      return Inertia::render('Admin/Packages/Edit');
    })->name('admin.packages.update');

    // Videos
    Route::get('/videos', function () {
      return Inertia::render('Admin/Videos/Index');
    })->name('admin.videos.index');

    Route::get('/videos/create', function () {
      return Inertia::render('Admin/Videos/Create');
    })->name('admin.videos.create');

    Route::post('/videos', function () {
      return Inertia::render('Admin/Videos/Index');
    })->name('admin.videos.store');

    Route::get('/videos/{video}/edit', function () {
      return Inertia::render('Admin/Videos/Edit');
    })->name('admin.videos.edit');

    Route::post('/videos/{video}', function () {
      return Inertia::render('Admin/Videos/Index');
    })->name('admin.videos.update');

    Route::delete('/videos/{video}', function () {
      return Inertia::render('Admin/Videos/Index');
    })->name('admin.videos.destroy');

    // Balance
    Route::get('/balances', function () {
      return Inertia::render('Admin/Balance');
    })->name('admin.balance');

    Route::patch('/balances/{balance}/approve', function () {
      return Inertia::render('Admin/Balance');
    })->name('admin.balance.approve');

    Route::patch('/balances/{balance}/reject', function () {
      return Inertia::render('Admin/Balance');
    })->name('admin.balance.reject');
  });

  // Customer routes
  Route::middleware('role:customer')->group(function () {
    // Videos
    Route::get('/', function () {
      return Inertia::render('Customer/Home');
    })->name('customer.home');

    Route::get('/{video}/watch', function () {
      return Inertia::render('Customer/Watch');
    })->name('customer.videos.watch');

    Route::patch('/{video}/progress', function () {
      return Inertia::render('Customer/Watch');
    })->name('customer.videos.progress');

    Route::post('/{video}/watched', function () {
      return Inertia::render('Customer/Watch');
    })->name('customer.videos.watched');

    // Balance
    Route::get('/balances', function () {
      return Inertia::render('Customer/Balance');
    })->name('customer.balance');

    // Withdraw
    Route::get('/withdraw', function () {
      return Inertia::render('Customer/Withdraw');
    })->name('customer.withdraw');

    Route::get('/withdraw', function () {
      return Inertia::render('Customer/Withdraw');
    })->name('customer.withdraw');

    Route::post('/withdraw', function () {
      return Inertia::render('Customer/Withdraw');
    })->name('customer.withdraw.store');

    // Packages
    Route::get('/packages', function () {
      return Inertia::render('Customer/Packages');
    })->name('customer.packages');

    Route::get('/checkout/{package}', function () {
      return Inertia::render('Customer/Checkout');
    })->name('customer.checkout');

    Route::get('/checkout/{package}/success', function () {
      return Inertia::render('Customer/ThankYou');
    })->name('customer.checkout.success');
  });

  // Profile
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// TODO: Public route for payment gateway
// Route::post('/webhook', [PaymentController::class, 'webhook']);

require __DIR__ . '/auth.php';
