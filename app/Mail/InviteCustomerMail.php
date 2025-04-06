<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InviteCustomerMail extends Mailable
{
  use Queueable, SerializesModels;

  public string $token;

  public function __construct(string $token)
  {
    $this->token = $token;
  }

  public function build()
  {
    return $this->subject('Você foi convidado para se cadastrar!')
      ->markdown('emails.customers.invite')
      ->with([
        'registrationLink' => url('/register?token=' . $this->token),
      ]);
  }
}
