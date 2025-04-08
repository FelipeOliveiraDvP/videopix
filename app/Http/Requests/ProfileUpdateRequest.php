<?php

namespace App\Http\Requests;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
  public function rules(): array
  {
    $user_id = Auth::user()->id;
    $customer_id = Auth::user()->customer ? Auth::user()->customer->id : null;

    return [
      'name'         => 'required|string|max:255',
      'email'        => [
        'required',
        'string',
        'lowercase',
        'email',
        'max:255',
        Rule::unique(User::class, 'email')->ignore($user_id),
      ],
      'phone'        => [
        'required',
        'string',
        'celular_com_ddd',
        Rule::unique(Customer::class, 'phone')->ignore($customer_id),
      ],
      'birth_date'   => 'required|date|before:today',
      'cpf'          => [
        'required',
        'string',
        'cpf',
        Rule::unique(Customer::class, 'cpf')->ignore($customer_id),
      ],
      'pix'          => [
        'required',
        'string',
        Rule::unique(Customer::class, 'pix')->ignore($customer_id),
      ],
    ];
  }

  public function messages(): array
  {
    return [
      'name.required'         => 'O nome é obrigatório.',
      'email.required'        => 'O e-mail é obrigatório.',
      'phone.required'        => 'O telefone é obrigatório.',
      'birth_date.required'   => 'A data de nascimento é obrigatória.',
      'cpf.required'          => 'O CPF é obrigatório.',
      'pix.required'          => 'O PIX é obrigatório.',
    ];
  }
}
