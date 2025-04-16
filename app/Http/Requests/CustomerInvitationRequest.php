<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerInvitationRequest extends FormRequest
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
      'emails' => ['required', 'array'],
      'emails.*' => ['required', 'email'],
    ];
  }

  public function messages(): array
  {
    return [
      'emails.required' => 'Você deve informar pelo menos um e-mail.',
      'emails.array' => 'O campo de e-mails deve ser uma lista.',
      'emails.*.email' => 'Todos os itens devem ser e-mails válidos.',
    ];
  }
}
