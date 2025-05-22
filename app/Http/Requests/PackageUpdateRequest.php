<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PackageUpdateRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'name' => 'required|string',
      'price' => 'required|numeric|min:5',
      'withdraw_percentage' => 'required|decimal:1|min:0',
      'duration_in_months' => 'required|integer|min:1|max:12',
    ];
  }

  /**
   * Get the validation messages for the request.
   *
   * @return array
   */
  public function messages()
  {
    return [
      'name.required' => 'O nome é obrigatório.',
      'name.string' => 'O nome deve ser uma string.',
      'name.unique' => 'O nome já existe.',
      'price.required' => 'O preço é obrigatório.',
      'price.numeric' => 'O preço deve ser um número.',
      'price.min' => 'O preço deve ser maior ou igual a R$ 5.',
      'withdraw_percentage.required' => 'A porcentagem de retirada é obrigatória.',
      'withdraw_percentage.decimal' => 'A porcentagem de retirada deve ser um número.',
      'withdraw_percentage.min' => 'A porcentagem de retirada deve ser maior ou igual a 0.',
      'duration_in_months.required' => 'A duração em meses é obrigatória.',
      'duration_in_months.integer' => 'A duração em meses deve ser um número inteiro.',
      'duration_in_months.min' => 'A duração em meses deve ser maior ou igual a 1.',
      'duration_in_months.max' => 'A duração em meses deve ser menor ou igual a 12.',
    ];
  }
}
