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
    Schema::create('customers', function (Blueprint $table) {
      $table->id();
      $table->string('phone');
      $table->dateTime('birth_date');
      $table->string('cpf');
      $table->string('pix');
      $table->boolean('accept_terms')->default(false);
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('customers');
  }
};
