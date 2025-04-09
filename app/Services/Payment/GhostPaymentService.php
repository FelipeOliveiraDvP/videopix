<?php

namespace App\Services\Payment;

use App\Models\Package;
use App\Models\Transaction;
use App\Models\UserPackage;
use App\Services\Mail\BrevoMailService;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GhostPaymentService implements PaymentService
{
  public function create(float $amount, array $customer = [], array $item = []): array
  {
    try {
      if (empty($customer) || empty($item)) {
        throw new \InvalidArgumentException('Invalid customer or item');
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
          'items' => [
            [
              'title' => $item['title'] ?? 'Sem título',
              'quantity' => 1,
              'unitPrice' => $amount,
              'tangible' => false,
            ]
          ],
        ],
      ]);

      if (!$response->successful()) {
        throw new Exception($response->getBody()->getContents());
      }

      $new_transaction = Transaction::create([
        'amount' => $amount,
        'user_id' => $customer['user_id'],
        'item_id' => $items[0]['id'] ?? null,
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
        'item' => $item,
      ]);

      return [
        'status' => 'error',
        'message' => 'Failed to create transaction',
      ];
    }
  }

  public function process(string $transaction_id, string $status): void
  {
    $transaction = Transaction::where('external_id', $transaction_id)->first();

    if (!$transaction) {
      Log::error('Transaction not found', [
        'transaction_id' => $transaction_id,
      ]);
      return;
    }

    if ($status === 'APPROVED' && $transaction->status == 'pending') {
      $transaction->status = 'completed';

      $mail = new BrevoMailService();
      $mail->send($transaction->user->email, 1);

      $user = $transaction->user;
      $package = Package::where('id', $transaction->item_id)->first();
      $user_package = UserPackage::where('user_id', $user->id)->first();

      if ($user_package) {
        $user_package->package_id = $package->id;
        $user_package->expires_at = $this->getExpirationDate($package);
        $user_package->save();
      } else {
        UserPackage::create([
          'user_id' => $user->id,
          'package_id' => $package->id,
          'expires_at' => $this->getExpirationDate($package),
        ]);
      }

      $transaction->save();
    } else {
      Log::warning('Unknown status received or invalid transaction', [
        'transaction_id' => $transaction_id,
        'status' => $status,
      ]);
      return;
    }
  }

  private function getExpirationDate(Package $package): string
  {
    return Carbon::parse(now()->addMonths($package->duration_in_months));
  }
}
