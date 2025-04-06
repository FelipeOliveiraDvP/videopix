<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'url',
    'duration',
    'price',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'duration' => 'integer',
      'price' => 'double',
    ];
  }

  /**
   * Get the users who watched this video.
   */
  public function users()
  {
    return $this->belongsToMany(User::class, 'user_videos')
      ->withPivot(['watched', 'watched_time', 'watched_at'])
      ->withTimestamps();
  }
}
