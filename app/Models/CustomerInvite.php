<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerInvite extends Model
{
  /**
   * Table name associated with the model.
   *
   * @var string
   */
  protected $table = 'customer_invites';

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'email',
    'code',
    'finished_registration',
    'expires_at',
    'accessed_at',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'finished_registration' => 'boolean',
      'expires_at' => 'datetime',
      'accessed_at' => 'datetime',
    ];
  }
}
