<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('packages', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->double('price', 8, 2)->unsigned()->default(0);
      $table->double('withdraw_percentage', 5, 2)->unsigned()->default(0);
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('user_packages', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->foreignId('package_id')->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('packages');
  }
};
