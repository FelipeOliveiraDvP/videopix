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
    Schema::table('packages', function ($table) {
      $table->integer('duration_in_months')->after('price')->default(0)->comment('Duration in months');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('packages', function (Blueprint $table) {
      $table->dropColumn('duration_in_months');
    });
  }
};
