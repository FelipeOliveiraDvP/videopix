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
          'description' => substr($exception->getMessage(), 0, 1200),
          'fields' => [
            [
              'name' => 'Arquivo',
              'value' => $exception->getFile(),
              'inline' => false,
            ],
            [
              'name' => 'Linha',
              'value' => $exception->getLine(),
              'inline' => false,
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
          'title' => 'Um cliente solicitou um saque.',
          'description' => "Para mais detalhes, acesse o painel em https://videopix.pro/admin/balances?cpf={$customer_cpf}&status=pending&type=withdraw",
          'fields' => [
            [
              'name' => 'ID da transação',
              'value' => $transaction_id,
              'inline' => false,
            ],
            [
              'name' => 'Cliente',
              'value' => $customer_name,
              'inline' => false,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => false,
            ],
            [
              'name' => 'Valor',
              'value' => number_format($amount, 2, ',', '.'),
              'inline' => false,
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
          'title' => 'Recebemos o pagamento da compra do pacote.',
          'description' => "Para mais detalhes, acesse o painel em https://videopix.pro/admin/balances?cpf={$customer_cpf}&status=success&type=deposit",
          'fields' => [
            [
              'name' => 'ID da transação',
              'value' => $transaction_id,
              'inline' => false,
            ],
            [
              'name' => 'Cliente',
              'value' => $customer_name,
              'inline' => false,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => false,
            ],
            [
              'name' => 'Pacote',
              'value' => $package_name,
              'inline' => false,
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
      'content' => 'Um novo cliente se cadastrou usando o link.',
      'embeds' => [
        [
          'title' => 'Informações do cliente',
          'description' => "Para mais detalhes, acesse o painel em https://videopix.pro/admin/customers?cpf={$customer_cpf}",
          'fields' => [
            [
              'name' => 'Nome do cliente',
              'value' => $customer_name,
              'inline' => false,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => false,
            ],
            [
              'name' => 'Email do cliente',
              'value' => $customer_email,
              'inline' => false,
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
      'content' => 'O cliente tentou contratar um pacote.',
      'embeds' => [
        [
          'title' => 'Informações do cliente',
          'fields' => [
            [
              'name' => 'Nome do cliente',
              'value' => $customer_name,
              'inline' => false,
            ],
            [
              'name' => 'CPF do cliente',
              'value' => $customer_cpf,
              'inline' => false,
            ],
            [
              'name' => 'Email do cliente',
              'value' => $customer_email,
              'inline' => false,
            ],
            [
              'name' => 'Pacote',
              'value' => $package_name,
              'inline' => false,
            ],
            [
              'name' => 'Valor',
              'value' => number_format($amount, 2, ',', '.'),
              'inline' => false,
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
