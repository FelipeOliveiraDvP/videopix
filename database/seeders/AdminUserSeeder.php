<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    User::create([
      'name' => 'Administrador',
      'email' => 'admin@gmail.com',
      'password' => bcrypt('12345678'), // Replace with a secure password
      'role' => 'admin',
    ]);
  }
}
