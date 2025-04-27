<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <title>Recuperação de senha</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div
    style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h1 style="color: #333;">Olá, {{ $user->name }}!</h1>
    <p style="color: #555;">Recebemos seu pedido de recuperação de senha. Para continuar, clique no botão abaixo:</p>

    @php
    $resetUrl = config('app.url') . '/reset-password/' . $token;
    @endphp

    <p style="text-align: center; margin: 30px 0;">
      <a href="{{ $resetUrl }}"
        style="background-color: #3490dc; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px;">Redefinir
        Senha</a>
    </p>

    <p style="color: #777;">Ou copie e cole o link no seu navegador:</p>
    <p style="word-break: break-all; color: #3490dc;">{{ $resetUrl }}</p>

    <hr style="margin: 30px 0;">

    <p style="color: #999;">Caso você não tenha solicitado a recuperação, pode ignorar este e-mail com segurança.
    </p>
  </div>
</body>

</html>
