<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $user = User::create([
      'name' => 'João da Silva',
      'email' => 'customer@email.com',
      'password' => bcrypt('12345678'), // Replace with a secure password
      'role' => 'customer',
    ]);

    Customer::create([
      'phone' => '11999995555',
      'birth_date' => '1990-01-01',
      'cpf' => '57696231014',
      'pix' => '57696231014',
      'accept_terms' => true,
      'user_id' => $user->id,
    ]);
  }
}
