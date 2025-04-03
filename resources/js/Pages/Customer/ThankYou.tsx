import { Head, Link, router } from "@inertiajs/react";
import { Button, Center, Container, Group, Stack, Text } from "@mantine/core";
import { usePageProps } from "@/hooks/usePageProps";
import CustomerLayout from "@/Layouts/CustomerLayout";

export default function ThankYou() {
  const { flash } = usePageProps();

  if (!flash.thank_you) router.visit(route("customer.home"));

  const title = {
    withdraw: "Retirada solicitada com sucesso!",
    checkout: "Pagamento realizado com sucesso!",
  }[flash.thank_you];

  const description = {
    withdraw: (
      <div>
        <Text size="lg" ta="center" mb="md">
          O seu pedido já enviado para a nossa equipe, e em breve o valor será
          depositado na sua conta 😎
        </Text>
        <Text size="lg" ta="center">
          Você receberá a confirmação do depósito por e-mail junto com o
          comprovante.
        </Text>
      </div>
    ),
    checkout: (
      <div>
        <Text size="lg" ta="center" mb="md">
          Recebemos o seu pagamento e agora você já pode fazer saques com o
          saldo disponível na sua conta 🤑.
        </Text>
        <Text size="lg" ta="center">
          Você receberá a confirmação do pagamento por e-mail junto com o
          comprovante.
        </Text>
      </div>
    ),
  }[flash.thank_you];

  return (
    <CustomerLayout>
      <Center h="100%">
        <Container>
          <Head title="Muito Obrigado" />
          <Stack gap="lg" align="center" justify="center">
            <Text fw={900} styles={{ root: { fontSize: 48 } }} ta="center">
              {title}
            </Text>
            {description}
            <Group justify="center">
              <Button
                variant="filled"
                component={Link}
                size="md"
                href={route("customer.home")}
              >
                Continuar Assistindo
              </Button>
            </Group>
          </Stack>
        </Container>
      </Center>
    </CustomerLayout>
  );
}
