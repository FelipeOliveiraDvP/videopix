<?php

namespace App\Services\Mail;

interface MailService
{
  public function send(string $email, string $templateUuid, array $variables = []): void;
}
