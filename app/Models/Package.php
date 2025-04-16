<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
  use SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'price',
    'withdraw_percentage',
    'duration_in_months',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'price' => 'double',
      'withdraw_percentage' => 'double',
    ];
  }

  /**
   * Get the users who have this package.
   */
  public function users()
  {
    return $this->belongsToMany(User::class, 'user_packages');
  }
}
