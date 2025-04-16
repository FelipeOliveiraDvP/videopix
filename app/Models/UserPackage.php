<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPackage extends Model
{
  /**
   * Table name associated with the model.
   *
   * @var string
   */
  protected $table = 'user_packages';

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'user_id',
    'package_id',
    'expires_at',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'user_id' => 'integer',
      'package_id' => 'integer',
      'expires_at' => 'datetime',
    ];
  }

  /**
   * Get the user that owns the package.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function user()
  {
    return $this->belongsTo(User::class);
  }

  /**
   * Get the package that belongs to the user.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function package()
  {
    return $this->belongsTo(Package::class);
  }
}
