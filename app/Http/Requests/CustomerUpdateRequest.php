<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use App\Models\Customer;

class CustomerUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    $customer = $this->route('customer'); // via Route Model Binding
    $userId = $customer->user_id ?? null;

    return [
      'name'         => 'required|string|max:255',
      'email'        => [
        'required',
        'string',
        'lowercase',
        'email',
        'max:255',
        Rule::unique(User::class, 'email')->ignore($userId),
      ],
      'phone'        => [
        'required',
        'string',
        'celular_com_ddd',
        Rule::unique(Customer::class, 'phone')->ignore($customer->id),
      ],
      'birth_date'   => 'required|date|before:today',
      'cpf'          => [
        'required',
        'string',
        'cpf',
        Rule::unique(Customer::class, 'cpf')->ignore($customer->id),
      ],
      'pix'          => [
        'required',
        'string',
        Rule::unique(Customer::class, 'pix')->ignore($customer->id),
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
