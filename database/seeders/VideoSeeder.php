<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Video::create([
      'url' => 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
      'duration' => 120,
      'price' => 0.75,
    ]);

    Video::create([
      'url' => 'https://www.youtube.com/watch?v=Cs8NuWUv8n4',
      'duration' => 150,
      'price' => 0.50,
    ]);

    Video::create([
      'url' => 'https://www.youtube.com/watch?v=m8sQAOS6shI',
      'duration' => 90,
      'price' => 0.99,
    ]);

    Video::create([
      'url' => 'https://www.youtube.com/watch?v=cTX-1nNxsLU',
      'duration' => 200,
      'price' => 1.50,
    ]);
  }
}
