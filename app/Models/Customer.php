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

  /**
   * Filters the query based on the provided filters.
   */
  public function scopeFilter(Builder $query, array $filters): Builder
  {
    return $query
      ->when(
        $filters['name'] ?? null,
        fn($q, $name) =>
        $q->whereHas(
          'user',
          fn($q) =>
          $q->where('name', 'like', '%' . $name . '%')
        )
      )
      ->when(
        $filters['email'] ?? null,
        fn($q, $email) =>
        $q->whereHas(
          'user',
          fn($q) =>
          $q->where('email', 'like', '%' . $email . '%')
        )
      )
      ->when(
        $filters['phone'] ?? null,
        fn($q, $phone) =>
        $q->where('phone', 'like', '%' . $phone . '%')
      )
      ->when(array_key_exists('active', $filters), function ($q) use ($filters) {
        if ($filters['active'] === 'true' || $filters['active'] === true) {
          $q->whereNull('deleted_at');
        } elseif ($filters['active'] === 'false' || $filters['active'] === false) {
          $q->whereNotNull('deleted_at');
        }
      });
  }
}
