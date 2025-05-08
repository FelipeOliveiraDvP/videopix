<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerInvitationRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Mail\InviteCustomerEmail;
use App\Models\Customer;
use App\Models\CustomerInvite;
use App\Models\Package;
use App\Models\UserPackage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;


class CustomerController extends Controller
{
  /**
   * Display the list of customers.
   */
  public function index(Request $request): Response
  {
    $filters = $request->only('name', 'email', 'cpf', 'phone', 'active');

    $customers = Customer::with('user')
      ->when(
        $filters['name'] ?? null,
        fn($query, $name) =>
        $query->whereHas(
          'user',
          fn($q) =>
          $q->where('name', 'like', "%{$name}%")
        )
      )
      ->when(
        $filters['email'] ?? null,
        fn($query, $email) =>
        $query->whereHas(
          'user',
          fn($q) =>
          $q->where('email', 'like', "%{$email}%")
        )
      )
      ->when(
        $filters['cpf'] ?? null,
        fn($query, $cpf) =>
        $query->where('cpf', 'like', "%{$cpf}%")
      )
      ->when(
        $filters['phone'] ?? null,
        fn($query, $phone) =>
        $query->where('phone', 'like', "%{$phone}%")
      )
      // ->when(
      //   !is_null($filters['active'] ?? null),
      //   fn($query, $active) =>
      //   $query->where('active', (bool)$active)
      // )
      ->orderBy('created_at', 'desc')
      ->paginate(100)
      ->withQueryString()
      ->through(fn($customer) => new CustomerResource($customer));

    return Inertia::render('Admin/Customers/Index', [
      'filters' => $filters,
      'customers' => $customers,
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

    $package = $user_package ? Package::where('id', $user_package->package_id)->first() : null;
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
      'packages' => Package::all(),
      'customer_package' => $package,
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

    if ($request->package_id) {
      $user_package = UserPackage::where('user_id', $customer->user_id)
        ->where('expires_at', '>=', now())
        ->first();

      if ($user_package) {
        $user_package->update([
          'package_id' => $request->package_id,
          'expires_at' => now()->addDays(30),
        ]);
      } else {
        UserPackage::create([
          'user_id' => $customer->user_id,
          'package_id' => $request->package_id,
          'expires_at' => now()->addDays(30),
        ]);
      }
    }

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
      $code = Str::uuid();

      CustomerInvite::create([
        'email' => $email,
        'code' => $code,
        'expires_at' => now()->addDays(7),
      ]);

      $inviteLink = URL::temporarySignedRoute(
        'register',
        now()->addDays(7),
        ['code' => $code]
      );

      // Mail::to($email)->send(new InviteCustomerEmail($inviteLink));
      $this->sendInviteByBrevo($email, $inviteLink);
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

  /**
   * Send a cusomer invite by Brevo API
   */
  private function sendInviteByBrevo(string $email, string $inviteLink): void
  {
    try {
      $html = view('emails.invite', [
        'inviteLink' => $inviteLink,
      ])->render();

      Http::withHeaders([
        'api-key' => config('services.brevo.api_key'),
        'Content-Type' => 'application/json',
      ])->post(config('services.brevo.api_url'), [
        'sender' => [
          'name' => config('mail.from.name'),
          'email' => config('mail.from.address')
        ],
        'to' => [[
          'email' => $email,
          'name' => 'Novo cliente'
        ]],
        'subject' => 'Bem vindo ao Video PIX!',
        'htmlContent' => $html,
        'trackLinks' => 'none'
      ]);
    } catch (Exception $e) {
      app(\App\Services\ExternalLogService::class)->fatalError($e);
      Log::error('Error sending email via Brevo: ' . $e->getMessage());
    }
  }
}
