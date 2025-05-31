<?php

use Illuminate\Support\Facades\Route;

Route::post('/webhook', [\App\Http\Controllers\WebhookController::class, 'process'])
  ->name('webhook.process');

Route::post('/send-invite', [\App\Http\Controllers\CustomerController::class, 'sendInvite'])
  ->name('webhook.sendInvite');
