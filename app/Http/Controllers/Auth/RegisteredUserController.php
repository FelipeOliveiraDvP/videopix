<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Balance;
use App\Models\Customer;
use App\Models\CustomerInvite;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
  /**
   * Display the registration view.
   */
  public function create(Request $request): Response
  {
    $email = $request->query('email');
    $invite = CustomerInvite::where('email', $email)->first();
    if ($invite) {
      $invite->update([
        'accessed_at' => now(),
      ]);
    }

    return Inertia::render('Auth/Register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(RegisterRequest $request): RedirectResponse
  {
    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'role' => 'customer'
    ]);

    Customer::create([
      'phone' => preg_replace('/[^0-9]/', '', $request->phone),
      'birth_date' => $request->birth_date,
      'cpf' => preg_replace('/[^0-9]/', '', $request->cpf),
      'pix' => $request->pix,
      'accept_terms' => $request->accept_terms,
      'user_id' => $user->id,
    ]);

    Balance::create([
      'user_id' => $user->id,
    ]);

    $invite = CustomerInvite::where('email', $request->email)->first();
    if ($invite) {
      $invite->update([
        'finished_registration' => true,
      ]);
    }

    event(new Registered($user));

    Auth::login($user);

    return redirect(route(get_user_home(), absolute: false));
  }
}
