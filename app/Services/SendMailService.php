<?php

namespace App\Services;

use Mailtrap\Config;
use Mailtrap\MailtrapClient;
use Illuminate\Support\Facades\Log;
use Mailtrap\Mime\MailtrapEmail;
use Symfony\Component\Mime\Address;

class SendMailService
{
  protected MailtrapClient $client;

  public function __construct()
  {
    $this->client = new MailtrapClient(new Config(env('MAILTRAP_API_KEY')));
  }

  public function send(string $email, string $templateUuid, array $variables = []): void
  {
    $client = new MailtrapClient(env('MAILTRAP_API_TOKEN'));

    $client->emails->send([
      'from' => [
        'email' => 'seu@email.com',
        'name' => 'Seu Nome',
      ],
      'to' => [
        ['email' => $email],
      ],
      'template_uuid' => $templateUuid,
      'template_variables' => $variables,
    ]);
  }

  // public function send(string $email, string $templateUuid, array $variables = [], string $name = 'Cliente'): bool
  // {
  //   try {
  //     $email = (new MailtrapEmail())
  //       ->from(new Address(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))) // <--- you should use your domain here that you installed in the mailtrap.io admin area (otherwise you will get 401)
  //       // ->replyTo(new Address('reply@YOUR-DOMAIN-HERE.com'))
  //       ->to(new Address($email, $name))
  //       // when using a template, you should not set a subject, text, HTML, category
  //       // otherwise there will be a validation error from the API side
  //       ->templateUuid($templateUuid)
  //       ->templateVariables($variables);

  //     MailtrapClient::initSendingEmails(
  //       apiKey: env('MAILTRAP_API_KEY') // your API token from here https://mailtrap.io/api-tokens
  //     )->send($email);

  //     return true;
  //   } catch (\Throwable $e) {
  //     Log::error("Erro ao enviar convite para {$email}: " . $e->getMessage());
  //     return false;
  //   }
  // }
}
