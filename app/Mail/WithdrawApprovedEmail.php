<?php

namespace App\Mail;

use App\Models\Customer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WithdrawApprovedEmail extends Mailable
{
  use Queueable, SerializesModels;


  public Customer $customer;
  public float $amount;
  public string $deposit_date;

  /**
   * Create a new message instance.
   */
  public function __construct($customer, $amount, $deposit_date)
  {
    $this->customer = $customer;
    $this->amount = $amount;
    $this->deposit_date = $deposit_date;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Solicitação de Saque aprovado',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      view: 'emails.withdraw',
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
