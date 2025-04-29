<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <title>Depósito Efetuado com Sucesso</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

    {{-- Logo --}}
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="{{ asset('images/logo.png') }}" alt="Sua Logo" style="max-width: 150px;">
    </div>

    {{-- Título --}}
    <h1 style="color: #602b9e; font-size: 26px; text-align: center;">Depósito Confirmado!</h1>

    {{-- Saudação --}}
    <p style="color: #333333; font-size: 16px; text-align: center;">
      Olá, <strong>{{ $customer->user->name }}</strong>! 🎉
    </p>

    <p style="color: #555555; font-size: 15px; text-align: center;">
      Seu depósito foi processado com sucesso e o valor já foi transferido para sua chave PIX cadastrada.
    </p>

    {{-- Dados do Depósito --}}
    @php
    $fmt = new \NumberFormatter('pt_BR', \NumberFormatter::CURRENCY);
    $formattedAmount = $fmt->formatCurrency($amount, 'BRL');
    $formattedDate = \Carbon\Carbon::parse($deposit_date)->format('d/m/Y');
    @endphp

    <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
      <tr>
        <th style="background-color: #602b9e; color: #ffffff; padding: 12px; text-align: left; border-radius: 8px 8px 0 0;">
          Detalhes do Depósito
        </th>
      </tr>
      <tr>
        <td style="padding: 15px; border: 1px solid #e0e0e0;">
          <strong>Valor Depositado:</strong> {{ $formattedAmount }}<br>
          <strong>Nome do Titular:</strong> {{ $customer->user->name }}<br>
          <strong>Chave PIX:</strong> {{ $customer->pix }}<br>
          <strong>Data do Depósito:</strong> {{ $formattedDate }}
        </td>
      </tr>
    </table>

    {{-- Linha separadora --}}
    <hr style="margin: 30px 0; border: none; height: 1px; background-color: #e0e0e0;">

    {{-- Ajuda --}}
    <p style="color: #777777; font-size: 14px; text-align: center;">
      Se tiver qualquer dúvida ou precisar de suporte, nossa equipe está à disposição para ajudar.
    </p>

    {{-- Rodapé --}}
    <p style="color: #aaaaaa; font-size: 12px; text-align: center; margin-top: 30px;">
      &copy; {{ date('Y') }} {{ config('app.name') }}. Todos os direitos reservados.
    </p>
  </div>
</body>

</html>
