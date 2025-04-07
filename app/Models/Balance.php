<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
  /**
   * Table name associated with the model.
   *
   * @var string
   */
  protected $table = 'balance';

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
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
      'amount' => 'double',
    ];
  }

  /**
   * Add a value to the balance.
   *
   * @param float $value
   * @return void
   */
  public function add(float $value): void
  {
    if ($value < 0) {
      $this->amount += 0;
    }

    $this->amount += $value;
    $this->save();
  }

  /**
   * Subtract a value from the balance.
   *
   * @param float $value
   * @return void
   */
  public function subtract(float $value): void
  {
    if ($value < 0 || $this->amount < $value) {
      throw new \InvalidArgumentException('Invalid value for subtraction');
    }

    $this->amount -= $value;
    $this->save();
  }
}
