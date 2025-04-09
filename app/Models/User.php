<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'role',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  /**
   * Get the user watched videos.
   */
  public function watchedVideos()
  {
    return $this->belongsToMany(Video::class, 'user_videos')
      ->withPivot(['watched', 'watched_time', 'watched_at'])
      ->wherePivot('watched', false)
      ->withTimestamps();
  }

  /**
   * Get the user unwatched videos.
   */
  public function unwatchedVideos()
  {
    return Video::whereDoesntHave('users', function ($query) {
      $query->where('user_id', $this->id);
    });
  }

  /**
   * Get the user customer.
   */
  public function customer()
  {
    return $this->hasOne(Customer::class);
  }

  /**
   * Get the user balance.
   */
  public function balance()
  {
    return $this->hasOne(Balance::class);
  }

  /**
   * Get the user package.
   */
  public function package()
  {
    return $this->belongsToMany(Package::class, 'user_packages')->latest();
  }

  /**
   * Get the user transactions.
   */
  public function transactions()
  {
    return $this->hasMany(Transaction::class);
  }
}
