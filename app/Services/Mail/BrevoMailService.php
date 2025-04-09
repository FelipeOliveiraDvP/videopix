<?php

namespace App\Services\Mail;

use Illuminate\Support\Facades\Log;


class BrevoMailService implements MailService
{
  public function send(string $email, string $template_id, array $variables = []): void
  {
    $config = \SendinBlue\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', env('BREVO_API_KEY'));
    $apiInstance = new \SendinBlue\Client\Api\TransactionalEmailsApi(
      new \GuzzleHttp\Client(),
      $config
    );

    $sendSmtpEmail = new \SendinBlue\Client\Model\SendSmtpEmail(); // \SendinBlue\Client\Model\SendSmtpEmail | Values to send a transactional email
    $sendSmtpEmail['to'] = array(array('email' => $email, 'name' => 'Cliente'));
    $sendSmtpEmail['templateId'] = $template_id;
    $sendSmtpEmail['params'] = $variables;
    $sendSmtpEmail['headers'] = ['X-Sib-Sandbox' => 'drop'];

    try {
      $apiInstance->sendTransacEmail($sendSmtpEmail);
    } catch (\Exception $e) {
      Log::error('An error occurs on sending e-mail', [
        'message' => $e->getMessage(),
        'email' => $email,
        'template_id' => $template_id,
        'variables' => $variables,
      ]);
    }
  }
}
