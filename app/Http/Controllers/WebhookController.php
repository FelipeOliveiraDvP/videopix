<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Payment\GhostPaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
  public function process(Request $request): JsonResponse
  {
    $transaction_id = $request->input('paymentId');
    $status = $request->input('status');

    if (!empty($transaction_id) && !empty($status)) {
      $gateway = new GhostPaymentService();

      $gateway->process($transaction_id, $status);
    }

    return response()->json([
      'status' => 'success',
      'message' => 'Webhook received successfully',
    ]);
  }
}
