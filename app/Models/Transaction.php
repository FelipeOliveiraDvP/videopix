<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
  use SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'user_id',
    'item_id',
    'amount',
    'gross_amount',
    'external_id',
    'pix_code',
    'pix_qrcode',
    'transaction_type',
    'status',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'amount' => 'double',
      'gross_amount' => 'double',
    ];
  }

  /**
   * Get the user that this transaction is related to.
   */
  public function user()
  {
    return $this->belongsTo(User::class);
  }

  /**
   * Get the package that this transaction is related to.
   */
  public function item()
  {
    return $this->belongsTo(Package::class, 'item_id');
  }
}
