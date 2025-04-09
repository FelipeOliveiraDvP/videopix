<?php

namespace App\Services\Payment;

use App\Models\Transaction;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GhostPaymentService implements PaymentService
{
  public function create(float $amount, array $customer = [], array $items = []): array
  {
    try {
      if (empty($customer)) {
        Log::error('Customer data is required');
        throw new \InvalidArgumentException('Customer data is required');
      }

      $api_key = env('GHOST_API_KEY');
      $api_url = env('GHOST_API_URL');

      $response = Http::withHeaders([
        'Authorization' => $api_key,
        'Content-Type' => 'application/json',
      ])->post($api_url, [
        'json' => [
          'name' => $customer['name'],
          'email' => $customer['email'],
          'phone' => only_numbers($customer['phone']),
          'cpf' => only_numbers($customer['cpf']),
          'paymentMethod' => 'PIX',
          'amount' => $amount,
          'items' => array_map(function ($item) use ($amount, $items) {
            return [
              'title' => $item['title'] ?? 'Sem título',
              'quantity' => $item['quantity'] ?? 1,
              'unitPrice' => $item['unitPrice'] ?? $amount / count($items),
              'tangible' => false,
            ];
          }, $items),
        ],
      ]);

      if (!$response->successful()) {
        Log::error('Failed to create transaction', [
          'response' => $response->getBody()->getContents(),
        ]);
        throw new Exception('Failed to create transaction');
      }

      $new_transaction = Transaction::create([
        'amount' => $amount,
        'user_id' => $customer['user_id'],
        'status' => 'pending',
        'transaction_type' => 'deposit',
        'transaction_id' => $response['id'],
      ]);

      return [
        'status' => 'success',
        'transaction_id' => $new_transaction->transaction_id,
        'pix_code' => $response['pixCode'],
        'pix_qrcode' => $response['pixQrCode'],
      ];
    } catch (Exception $e) {
      Log::error('Failed to create transaction', [
        'error' => $e->getMessage(),
        'amount' => $amount,
        'customer' => $customer,
        'items' => $items,
      ]);

      return [
        'status' => 'error',
        'message' => 'Failed to create transaction',
      ];
    }
  }

  public function process(string $transaction_id, string $status): void
  {
    $transaction = Transaction::where('transaction_id', $transaction_id)->first();

    if (!$transaction) {
      Log::error('Transaction not found', [
        'transaction_id' => $transaction_id,
      ]);
      return;
    }

    if ($status === 'APPROVED') {
      $transaction->status = 'completed';
    } else {
      Log::warning('Unknown status received', [
        'transaction_id' => $transaction_id,
        'status' => $status,
      ]);
      return;
    }

    $transaction->save();
  }
}
