<?php

namespace App\Services\Mail;

use Illuminate\Support\Facades\Log;

class BrevoMailService implements MailService
{
  public function send(string $email, string $templateUuid, array $variables = []): void
  {
    Log::info('Sending email', [
      'email' => $email,
      'templateUuid' => $templateUuid,
      'variables' => $variables,
    ]);
  }
}
