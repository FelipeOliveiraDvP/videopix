<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'url' => $this->url,
      'price' => $this->price,
      'duration' => $this->duration,
      'watched_time' => $this->pivot->watched_time ?? null,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
