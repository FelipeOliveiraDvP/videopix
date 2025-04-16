<?php

namespace App\Http\Requests\Auth;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => 'required|string|max:255',
      'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
      'phone' => 'required|string|celular_com_ddd|unique:' . Customer::class,
      'birth_date' => 'required|date|before:today',
      'cpf' => 'required|string|cpf|unique:' . Customer::class,
      'pix' => 'required|string|unique:' . Customer::class,
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
      'accept_terms' => 'accepted',
    ];
  }

  /**
   * Get the validation error messages that apply to the request.
   *
   * @return array<string, string>
   */
  public function messages(): array
  {
    return [
      'name.required' => 'O nome é obrigatório.',
      'email.required' => 'O e-mail é obrigatório.',
      'phone.required' => 'O telefone é obrigatório.',
      'birth_date.required' => 'A data de nascimento é obrigatória.',
      'cpf.required' => 'O CPF é obrigatório.',
      'pix.required' => 'O PIX é obrigatório.',
      'password.required' => 'A senha é obrigatória.',
      'accept_terms.accepted' => 'Você deve aceitar os termos de uso.',
    ];
  }

  /**
   * Attempt to authenticate the request's credentials.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function authenticate(): void
  {
    $this->ensureIsNotRateLimited();

    if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
      RateLimiter::hit($this->throttleKey());

      throw ValidationException::withMessages([
        'email' => trans('auth.failed'),
      ]);
    }

    RateLimiter::clear($this->throttleKey());
  }

  /**
   * Ensure the login request is not rate limited.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function ensureIsNotRateLimited(): void
  {
    if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
      return;
    }

    event(new Lockout($this));

    $seconds = RateLimiter::availableIn($this->throttleKey());

    throw ValidationException::withMessages([
      'email' => trans('auth.throttle', [
        'seconds' => $seconds,
        'minutes' => ceil($seconds / 60),
      ]),
    ]);
  }

  /**
   * Get the rate limiting throttle key for the request.
   */
  public function throttleKey(): string
  {
    return Str::transliterate(Str::lower($this->string('email')) . '|' . $this->ip());
  }
}
