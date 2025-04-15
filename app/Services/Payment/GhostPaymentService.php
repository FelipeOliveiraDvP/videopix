<?php

namespace App\Services\Payment;

use App\Models\Package;
use App\Models\Transaction;
use App\Models\UserPackage;
use App\Services\Mail\BrevoMailService;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GhostPaymentService implements PaymentService
{
  public function create(float $amount, array $customer = [], array $item = []): array
  {
    try {
      if ($this->invalidCustomer($customer) || $this->invalidItem($item)) {
        throw new \InvalidArgumentException('Invalid customer or item');
      }

      $transaction = Transaction::where('user_id', $customer['id'])
        ->where('item_id', $item['id'])
        ->where('status', 'pending')
        ->where('transaction_type', 'deposit')
        ->first();

      if (App::environment('development')) {
        if (!$transaction) {
          Transaction::create([
            'amount' => $amount,
            'user_id' => $customer['id'],
            'item_id' => $item['id'],
            'status' => 'pending',
            'transaction_type' => 'deposit',
            'external_id' => uniqid(),
            'pix_code' => '123456789',
            'pix_qrcode' => 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIXCODE',
          ]);
        }

        return [
          'status' => 'success',
        ];
      }

      $api_key = config('services.ghost.api_key');
      $api_url = config('services.ghost.api_url');

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

      if (!$transaction) {
        Transaction::create([
          'amount' => $amount,
          'user_id' => $customer['id'],
          'item_id' => $item['id'],
          'status' => 'pending',
          'transaction_type' => 'deposit',
          'external_id' => $response['id'],
          'pix_code' => $response['pixCode'],
          'pix_qrcode' => $response['pixQrCode'],
        ]);
      } else {
        $transaction->update([
          'amount' => $amount,
          'external_id' => $response['id'],
          'pix_code' => $response['pixCode'],
          'pix_qrcode' => $response['pixQrCode'],
        ]);
      }

      return [
        'status' => 'success',
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
    $transaction = Transaction::where('external_id', $transaction_id)
      ->where('transaction_type', 'deposit')
      ->where('status', 'pending')
      ->first();

    if (!$transaction) {
      Log::error('Transaction not found', [
        'transaction_id' => $transaction_id,
      ]);
      return;
    }

    if ($status == 'APPROVED' && $transaction->status == 'pending') {
      $transaction->status = 'completed';
      $transaction->save();

      if (App::environment('production')) {
        $mail = new BrevoMailService();
        $mail->send($transaction->user->email, 1);
      }

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

      $user->balance->add($transaction->amount);
    } else {
      Log::error('Unknown status received or invalid transaction', [
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

  private function invalidCustomer(array $customer): bool
  {
    return empty($customer['id']) || empty($customer['name']) || empty($customer['email']) || empty($customer['phone']) || empty($customer['cpf']);
  }

  private function invalidItem(array $item): bool
  {
    return empty($item['id']) || empty($item['title']);
  }
}
