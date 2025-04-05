<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
  /**
   * Display the registration view.
   */
  public function create(): Response
  {
    return Inertia::render('Auth/Register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request): RedirectResponse
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
      'phone' => 'required|string|celular_com_ddd|unique:' . Customer::class,
      'birth_date' => 'required|date|before:today',
      'cpf' => 'required|string|cpf|unique:' . Customer::class,
      'pix' => 'required|string|unique:' . Customer::class,
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
      'accept_terms' => 'accepted',
    ], [
      'name.required' => 'O nome é obrigatório.',
      'email.required' => 'O e-mail é obrigatório.',
      'phone.required' => 'O telefone é obrigatório.',
      'birth_date.required' => 'A data de nascimento é obrigatória.',
      'cpf.required' => 'O CPF é obrigatório.',
      'pix.required' => 'O PIX é obrigatório.',
      'password.required' => 'A senha é obrigatória.',
      'accept_terms.accepted' => 'Você deve aceitar os termos de uso.',
    ]);

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

    event(new Registered($user));

    Auth::login($user);

    return redirect(route(get_user_home(), absolute: false));
  }
}
