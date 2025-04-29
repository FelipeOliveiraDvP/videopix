<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Customer extends Model
{
  use SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'phone',
    'birth_date',
    'cpf',
    'pix',
    'accept_terms',
    'user_id',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'birth_date' => 'datetime',
      'accept_terms' => 'boolean',
    ];
  }

  /**
   * Get the user that owns the customer.
   */
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
