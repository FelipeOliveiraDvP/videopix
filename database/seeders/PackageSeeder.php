<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Package::create([
      'name' => 'Bronze',
      'price' => 10,
      'withdraw_percentage' => 0.1,
    ]);

    Package::create([
      'name' => 'Prata',
      'price' => 20,
      'withdraw_percentage' => 0.2,
    ]);

    Package::create([
      'name' => 'Ouro',
      'price' => 30,
      'withdraw_percentage' => 0.3,
    ]);

    Package::create([
      'name' => 'Diamante',
      'price' => 40,
      'withdraw_percentage' => 0.4,
    ]);

    Package::create([
      'name' => 'Platina',
      'price' => 50,
      'withdraw_percentage' => 0.5,
    ]);
  }
}
