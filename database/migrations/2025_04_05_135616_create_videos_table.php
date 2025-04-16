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
    Schema::create('videos', function (Blueprint $table) {
      $table->id();
      $table->string('url')->unique();
      $table->integer('duration', false, true)->default(0);
      $table->double('price', 8, 2)->default(0);
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('user_videos', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
      $table->unique(['user_id', 'video_id']);
      $table->integer('watched_time', false, true)->default(0);
      $table->dateTime('watched_at')->nullable();
      $table->boolean('watched')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('videos');
  }
};
