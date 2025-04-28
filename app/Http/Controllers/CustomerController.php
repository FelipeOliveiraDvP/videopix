<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerInvitationRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\Package;
use App\Models\UserPackage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Request;
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
    $user = $customer->user;
    $user_package = UserPackage::where('user_id', $user->id)
      ->where('expires_at', '>=', now())
      ->first();

    $package = Package::where('id', $user_package->package_id)->first() ?? null;
    $deposits = $user->transactions()
      ->where('transaction_type', 'deposit')
      ->sum('amount');
    $withdraws = $user->transactions()
      ->where('transaction_type', 'withdraw')
      ->sum('amount');
    $balance = $user->balance
      ? $user->balance->amount
      : 0;

    return Inertia::render('Admin/Customers/Edit', [
      'customer' => new CustomerResource($customer),
      'package' => $package,
      'deposits' => $deposits,
      'withdraws' => $withdraws,
      'balance' => $balance,
    ]);
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
   * Send invitations to customers.
   */
  public function invite(CustomerInvitationRequest $request): RedirectResponse
  {
    $emails = $request->validated()['emails'];

    foreach ($emails as $email) {
      $token = Str::uuid();

      // Opcional: salvar token no banco para validação futura

      // $emailService->send(
      //   $email,
      //   env('MAIL_TEMPLATE_INVITATION'), // Substitua pelo UUID do seu template
      //   [
      //     'register_customer_url' => route('register', ['token' => $token]),
      //   ],
      // );
    }

    return redirect()->back()->with('success', 'Convites enviados com sucesso!');
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
