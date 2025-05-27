<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use GuzzleHttp\Client;

class BrevoService
{
  protected TransactionalEmailsApi $apiInstance;

  public function __construct()
  {
    $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', config('services.brevo.api_key'));

    $this->apiInstance = new TransactionalEmailsApi(
      new Client(),
      $config
    );
  }

  /**
   * Envia e-mail via API da Brevo
   *
   * @param array $data [
   *     'to' => [['email' => '', 'name' => '']],
   *     'subject' => '',
   *     'htmlContent' => '',
   *     'sender' => ['email' => '', 'name' => ''] // opcional, usa config se não informado
   * ]
   * @return bool
   */
  public function sendMail(array $data): bool
  {
    try {
      $email = new \SendinBlue\Client\Model\SendSmtpEmail([
        'subject'      => $data['subject'],
        'htmlContent'  => $data['htmlContent'],
        'sender'       => $data['sender'] ?? [
          'email' => config('mail.from.address'),
          'name'  => config('mail.from.name'),
        ],
        'to'           => $data['to'],
      ]);

      $this->apiInstance->sendTransacEmail($email);
      return true;
    } catch (Exception $e) {
      app(\App\Services\ExternalLogService::class)->fatalError($e);
      Log::error('Erro ao enviar e-mail via Brevo: ' . $e->getMessage(), [
        'data' => $data,
        'exception' => $e,
      ]);
      return false;
    }
  }
}
