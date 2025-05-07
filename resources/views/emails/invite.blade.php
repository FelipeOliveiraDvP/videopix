<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <title>Bem vindo ao Video PIX!!</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

    {{-- Logo --}}
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="{{ asset('images/logo.png') }}" alt="Sua Logo" style="max-width: 150px;">
    </div>

    {{-- Título --}}
    <h1 style="color: #602b9e; font-size: 26px; text-align: center;">Você foi convidado para acessar o Video PIX!!</h1>

    {{-- Saudação --}}
    <p style="color: #333333; font-size: 16px; text-align: center;">Seja muito bem vindo! 👋</p>
    <p style="color: #555555; font-size: 15px; text-align: center;">
      Você foi convidado para acessar o Video PIX. Clique no botão abaixo para ativar sua conta e começar a usar.
    </p>

    {{-- Botão de Acesso --}}
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ $inviteLink }}" style="background-color: #602b9e; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-size: 16px;">
        Ativar Conta
      </a>
    </div>

    {{-- Aviso sobre expiração --}}
    <p style="color: #777777; font-size: 14px; text-align: center;">
      Este link expira em <strong>7 dias</strong>. Após esse prazo, será necessário solicitar um novo convite.
    </p>

    {{-- Linha separadora --}}
    <hr style="margin: 30px 0; border: none; height: 1px; background-color: #e0e0e0;">

    {{-- Ajuda --}}
    <p style="color: #777777; font-size: 14px; text-align: center;">
      Se tiver qualquer dúvida ou precisar de ajuda, estamos por aqui! Basta responder este e-mail.
    </p>

    {{-- Rodapé --}}
    <p style="color: #aaaaaa; font-size: 12px; text-align: center; margin-top: 30px;">
      &copy; {{ date('Y') }} {{ config('app.name') }}. Todos os direitos reservados.
    </p>
  </div>
</body>

</html>