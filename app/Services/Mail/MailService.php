<?php

namespace App\Services\Mail;

interface MailService
{
  public function send(string $email, string $template_id, array $variables = []): void;
}
