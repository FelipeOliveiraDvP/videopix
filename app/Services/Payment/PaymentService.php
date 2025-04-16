<?php

namespace App\Services\Payment;

interface PaymentService
{
  public function create(float $amount, array $customer = [], array $item = []): array;

  public function process(string $transaction_id, string $status): void;
}
