<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'name' => $this->user->name,
      'email' => $this->user->email,
      'phone' => $this->phone,
      'birth_date' => $this->birth_date->format('Y-m-d'),
      'cpf' => $this->cpf,
      'pix' => $this->pix,
      'active' => is_null($this->deleted_at),
      'created_at' => $this->created_at->format('Y-m-d H:i:s'),
      'updated_at' => $this->updated_at,
    ];
  }
}
