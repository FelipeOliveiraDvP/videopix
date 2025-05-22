<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoRequest extends FormRequest
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
      'url' => 'required|string|url',
      'price' => 'required|numeric|min:0',
      'duration' => 'required|integer|min:0',
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
      'url.required' => 'O URL é obrigatório.',
      'url.string' => 'O URL deve ser uma string.',
      'url.url' => 'O URL deve ser um link válido.',
      'price.required' => 'O preço é obrigatório.',
      'price.decimal' => 'O preço deve ser um número.',
      'price.min' => 'O preço deve ser maior ou igual a 0.',
      'duration.required' => 'A duração é obrigatória.',
      'duration.integer' => 'A duração deve ser um número inteiro.',
      'duration.min' => 'A duração deve ser maior ou igual a 0.',
    ];
  }
}
