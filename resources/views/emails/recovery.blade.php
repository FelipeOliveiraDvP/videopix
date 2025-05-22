<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <title>Recuperação de Senha</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

    {{-- Logo --}}
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="{{ asset('images/logo.png') }}" alt="Sua Logo" style="max-width: 150px;">
    </div>

    {{-- Título --}}
    <h1 style="color: #602b9e; font-size: 26px; text-align: center;">Redefinição de Senha</h1>

    {{-- Saudação --}}
    <p style="color: #333333; font-size: 16px; text-align: center;">Olá, <strong>{{ $user->name }}</strong>! 👋</p>
    <p style="color: #555555; font-size: 15px; text-align: center;">
      Recebemos uma solicitação para redefinir sua senha. Para continuar, clique no botão abaixo:
    </p>

    {{-- Botão --}}
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ $url }}"
        style="background-color: #602b9e; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-size: 16px;">
        Redefinir Senha
      </a>
    </div>

    {{-- Aviso --}}
    <p style="color: #999999; font-size: 13px; text-align: center;">
      Se você não solicitou essa redefinição, nenhuma ação é necessária.
    </p>

    {{-- Linha separadora --}}
    <hr style="margin: 30px 0; border: none; height: 1px; background-color: #e0e0e0;">

    {{-- Ajuda --}}
    <p style="color: #777777; font-size: 14px; text-align: center;">
      Precisa de ajuda ou suporte? Responda este e-mail ou entre em contato com nossa equipe.
    </p>

    {{-- Rodapé --}}
    <p style="color: #aaaaaa; font-size: 12px; text-align: center; margin-top: 30px;">
      &copy; {{ date('Y') }} {{ config('app.name') }}. Todos os direitos reservados.
    </p>
  </div>
</body>

</html>
