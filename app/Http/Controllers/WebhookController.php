<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\InviteCustomerEmail;
use App\Models\CustomerInvite;
use App\Services\Payment\GhostPaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

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

  public function invite(Request $request): JsonResponse
  {
    $email = $request->input('email');

    if (empty($email)) {
      return response()->json([
        'status' => 'error',
        'message' => 'Email is required',
      ], 400);
    }

    $code = Str::uuid();

    CustomerInvite::create([
      'email' => $email,
      'code' => $code,
      'expires_at' => now()->addDays(7),
    ]);

    $inviteLink = URL::temporarySignedRoute(
      'register',
      now()->addDays(7),
      ['code' => $code]
    );

    Mail::to($email)->send(new InviteCustomerEmail($inviteLink));

    return response()->json([
      'status' => 'success',
      'message' => 'Invitation sent successfully',
      'invite_link' => $inviteLink,
    ]);
  }
}
