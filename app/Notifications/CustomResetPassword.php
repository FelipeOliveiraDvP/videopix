<?php

namespace App\Notifications;

use App\Services\BrevoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class CustomResetPassword extends Notification
{
  use Queueable;

  public object $notifiable;

  /**
   * Create a new notification instance.
   */
  public function __construct(private string $token) {}

  /**
   * Get the notification's delivery channels.
   *
   * @return array<int, string>
   */
  public function via(object $notifiable): array
  {
    return [];
  }

  /**
   * Get the mail representation of the notification.
   */
  // public function toMail(object $notifiable): MailMessage
  // {
  //   $url = URL::to(route('password.reset', [
  //     'token' => $this->token,
  //     'email' => $notifiable->getEmailForPasswordReset(),
  //   ], false));

  //   return (new MailMessage)
  //     ->subject('Recupere sua senha')
  //     ->view('emails.recovery', [
  //       'url' => $url,
  //       'user' => $notifiable,
  //     ]);
  // }

  /**
   * Get the array representation of the notification.
   *
   * @return array<string, mixed>
   */
  public function toArray(object $notifiable): array
  {
    return [
      //
    ];
  }

  public function sendCustom(): void
  {
    $user = $this->notifiable; // definido manualmente antes de chamar

    $url = URL::to(route('password.reset', [
      'token' => $this->token,
      'email' => $user->getEmailForPasswordReset(),
    ], false));

    $html = view('emails.recovery', [
      'url' => $url,
      'user' => $user,
    ])->render();

    App::make(BrevoService::class)->sendMail([
      'to' => [[
        'email' => $user->email,
        'name' => $user->name,
      ]],
      'subject' => 'Recupere sua senha',
      'htmlContent' => $html,
    ]);
  }
}
