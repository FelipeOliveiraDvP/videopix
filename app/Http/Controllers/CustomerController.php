<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Request;




class CustomerController extends Controller
{
  /**
   * Display the list of customers.
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Customers/Index', [
      'filters' => Request::all('name', 'email', 'phone', 'active'),
      'customers' => Customer::with('user')
        ->filter(Request::only('name', 'email', 'phone', 'active'))
        ->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString()
        ->through(fn($customer) => [
          'id' => $customer->id,
          'name' => $customer->user->name,
          'email' => $customer->user->email,
          'phone' => $customer->phone,
          'active' => is_null($customer->deleted_at),
          'created_at' => $customer->created_at->format('Y-m-d H:i:s'),
          'updated_at' => $customer->updated_at,
        ]),
    ]);
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
