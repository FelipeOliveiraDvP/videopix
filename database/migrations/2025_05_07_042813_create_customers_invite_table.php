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
    Schema::create('customer_invites', function (Blueprint $table) {
      $table->id();
      $table->string('email')->unique();
      $table->string('code')->unique();
      $table->boolean('finished_registration')->default(false);
      $table->dateTime('expires_at')->nullable();
      $table->dateTime('accessed_at')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('customer_invites');
  }
};
