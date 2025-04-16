<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVideo extends Model
{
  /**
   * Table name associated with the model.
   *
   * @var string
   */
  protected $table = 'user_videos';

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'user_id',
    'video_id',
    'watched_at',
    'watched_time',
    'watched',
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
      'video_id' => 'integer',
      'watched_at' => 'datetime',
      'watched_time' => 'integer',
      'watched' => 'boolean',
    ];
  }
}
