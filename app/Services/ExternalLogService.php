<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExternalLogService
{
  public function fatalError(Exception $exception): void
  {
    $url = config('logging.discord.fatal_error');

    $payload = [
      'content' => 'Ocorreu um erro fatal no sistema.',
      'embeds' => [
        [
          'title' => 'Detalhes do erro',
          'description' => $exception->getMessage(),
          'fields' => [
            [
              'name' => 'Arquivo',
              'value' => $exception->getFile(),
              'inline' => true,
            ],
            [
              'name' => 'Linha',
              'value' => $exception->getLine(),
              'inline' => true,
            ],
            [
              'name' => 'Trace',
              'value' => $exception->getTraceAsString(),
            ],
          ],
        ],
      ],
    ];

    $response = Http::withHeaders([
      'Content-Type' => 'application/json',
    ])
      ->withOptions([
        'verify' => false,
      ])
      ->post($url, $payload);

    if (!$response->successful()) {
      Log::error('Failed to send fatal error log', [
        'error' => $response->getBody()->getContents(),
        'payload' => $payload,
      ]);
    }
  }

  public function newWithdraw(string $transaction_id, string $customer_name, string $customer_cpf, float $amount): void
  {
    $url = config('logging.discord.new_withdraw');

    $payload = [
      'content' => 'Novo saque solicitado.',
      'embeds' => [
        [
          'title' => 'Detalhes do saque',
          'description' => 'Um novo saque foi solicitado.',
          'fields' => [
            [
              'name' => 'ID da transação',
              'value' => $transaction_id,
              'inline' => true,
            ],
            [
              'name' => 'Cliente',
              'value' => $customer_name,
              'inline' => true,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => true,
            ],
            [
              'name' => 'Valor',
              'value' => number_format($amount, 2, ',', '.'),
              'inline' => true,
            ]
          ],
        ],
      ],
    ];

    $response = Http::withHeaders([
      'Content-Type' => 'application/json',
    ])
      ->withOptions([
        'verify' => false,
      ])
      ->post($url, $payload);

    if (!$response->successful()) {
      Log::error('Failed to send new withdrawl log', [
        'error' => $response->getBody()->getContents(),
        'payload' => $payload,
      ]);
    }
  }

  public function paymentConfirm(string $transaction_id, string $customer_name, string $customer_cpf, string $package_name): void
  {
    $url = config('logging.discord.payment_confirm');

    $payload = [
      'content' => 'Pagamento confirmado.',
      'embeds' => [
        [
          'title' => 'Detalhes do pagamento',
          'description' => 'Um pagamento foi confirmado.',
          'fields' => [
            [
              'name' => 'ID da transação',
              'value' => $transaction_id,
              'inline' => true,
            ],
            [
              'name' => 'Cliente',
              'value' => $customer_name,
              'inline' => true,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => true,
            ],
            [
              'name' => 'Pacote',
              'value' => $package_name,
              'inline' => true,
            ]
          ],
        ],
      ],
    ];

    $response = Http::withHeaders([
      'Content-Type' => 'application/json',
    ])
      ->withOptions([
        'verify' => false,
      ])
      ->post($url, $payload);

    if (!$response->successful()) {
      Log::error('Failed to send payment confirmation log', [
        'error' => $response->getBody()->getContents(),
        'payload' => $payload,
      ]);
    }
  }

  public function newCustomer(string $customer_name, string $customer_cpf, string $customer_email): void
  {
    $url = config('logging.discord.new_customer');

    $payload = [
      'content' => 'Novo cliente cadastrado.',
      'embeds' => [
        [
          'title' => 'Detalhes do cliente',
          'description' => 'Um novo cliente foi cadastrado.',
          'fields' => [
            [
              'name' => 'Nome do cliente',
              'value' => $customer_name,
              'inline' => true,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => true,
            ],
            [
              'name' => 'Email do cliente',
              'value' => $customer_email,
              'inline' => true,
            ]
          ],
        ],
      ],
    ];

    $response = Http::withHeaders([
      'Content-Type' => 'application/json',
    ])
      ->withOptions([
        'verify' => false,
      ])
      ->post($url, $payload);

    if (!$response->successful()) {
      Log::error('Failed to send new customer log', [
        'error' => $response->getBody()->getContents(),
        'payload' => $payload,
      ]);
    }
  }

  public function newPurchase(string $customer_name, string $customer_cpf, string $customer_email, string $package_name, float $amount): void
  {
    $url = config('logging.discord.new_purchase');

    $payload = [
      'content' => 'Nova compra realizada.',
      'embeds' => [
        [
          'title' => 'Detalhes do cliente',
          'description' => 'Um novo cliente foi cadastrado.',
          'fields' => [
            [
              'name' => 'Nome do cliente',
              'value' => $customer_name,
              'inline' => true,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => true,
            ],
            [
              'name' => 'Email do cliente',
              'value' => $customer_email,
              'inline' => true,
            ],
            [
              'name' => 'Pacote',
              'value' => $package_name,
              'inline' => true,
            ],
            [
              'name' => 'Valor',
              'value' => number_format($amount, 2, ',', '.'),
              'inline' => true,
            ]
          ],
        ],
      ],
    ];

    $response = Http::withHeaders([
      'Content-Type' => 'application/json',
    ])
      ->withOptions([
        'verify' => false,
      ])
      ->post($url, $payload);

    if (!$response->successful()) {
      Log::error('Failed to send new purchase log', [
        'error' => $response->getBody()->getContents(),
        'payload' => $payload,
      ]);
    }
  }
}
