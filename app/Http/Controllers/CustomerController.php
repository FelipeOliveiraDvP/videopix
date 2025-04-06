<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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
        ->paginate(100)
        ->withQueryString()
        ->through(fn($customer) => new CustomerResource($customer)),
    ]);
  }

  /**
   * Show the form to edit a specific customer.
   */
  public function edit(Customer $customer): Response
  {
    return Inertia::render('Admin/Customers/Edit', [
      'customer' => new CustomerResource($customer),
    ]);
  }

  /**
   * Store a new customer.
   */
  public function store(CustomerStoreRequest $request): RedirectResponse
  {
    $emails = $request->validated()['emails'];

    foreach ($emails as $email) {
      $token = Str::uuid();

      // Opcional: salvar token no banco para validação futura

      Mail::to($email)->send(new \App\Mail\InviteCustomerMail($token));
    }

    return redirect()->back()->with('success', 'Convites enviados com sucesso!');
  }

  /**
   * Update an existing customer.
   */
  public function update(CustomerUpdateRequest $request, Customer $customer): RedirectResponse
  {
    $customer->update($request->validated());

    return redirect()
      ->route('admin.customers.index')
      ->with('success', 'Cliente atualizado com sucesso.');
  }

  /**
   * Delete a customer.
   *
   */
  public function destroy(): RedirectResponse
  {
    // Implement the logic to delete a customer
    // For example, you can use the Customer model to find and delete the customer

    return redirect()
      ->route('admin.customers.index')
      ->with('success', 'Cliente excluído com sucesso.');
  }
}
