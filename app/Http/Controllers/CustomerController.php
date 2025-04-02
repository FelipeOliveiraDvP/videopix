<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
  /**
   * Display the list of customers.
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Customers/Index');
  }

  /**
   * Show the form to edit a specific customer.
   */
  public function edit(): Response
  {
    return Inertia::render('Admin/Customers/Edit');
  }

  /**
   * Store a new customer.
   */
  public function store(): Response
  {
    return Inertia::render('Admin/Customers/Index');
  }

  /**
   * Update an existing customer.
   */
  public function update(): Response
  {
    return Inertia::render('Admin/Customers/Edit');
  }

  /**
   * Delete a customer.
   */
  public function destroy(): Response
  {
    return Inertia::render('Admin/Customers/Index');
  }
}
