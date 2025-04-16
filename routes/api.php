<?php

use Illuminate\Support\Facades\Route;

Route::post('/webhook', [\App\Http\Controllers\WebhookController::class, 'process'])
  ->name('webhook.process');
