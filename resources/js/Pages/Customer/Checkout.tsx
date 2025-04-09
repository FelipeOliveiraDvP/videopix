import { usePageProps } from "@/hooks/usePageProps";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Package } from "@/types";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link, router } from "@inertiajs/react";
import {
  ActionIcon,
  Alert,
  Anchor,
  CopyButton,
  Grid,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { item, pix_code, pix_qr_code } = usePageProps<{
    item: Package;
    pix_code: string;
    pix_qr_code: string;
  }>();

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          router.visit(route("customer.checkout.success", item.id));
          return 30;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CustomerLayout>
      <Head title="Pagamento" />

      <Stack gap="lg">
        <div>
          <Title order={2}>Finalizar Compra</Title>
          <Text c="dimmed" size="lg">
            Para finalizar a sua compra, escaneie o QRCode abaixo ou copie
            código do PIX e cole no seu aplicativo de banco.
          </Text>
        </div>
        <Paper>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack justify="space-between">
                <Title order={3} mb="xs">
                  Resumo do pedido
                </Title>
                <div>
                  <Text size="md">Pacote Contratado</Text>
                  <Text size="xl" fw="bold">
                    {item.name}
                  </Text>
                </div>
                <div>
                  <Text size="md">Preço R$</Text>
                  <Text size="xl" fw="bold">
                    {moneyFormat(item.price)}
                  </Text>
                </div>
                <Text size="md">
                  Após realizar o pagamento, você receberá um e-mail com a
                  confirmação da compra.
                </Text>
                <Text size="md">
                  Permaneça na página até que o pagamento seja confirmado. Caso
                  precise sair por algum motivo, você pode acessar a{" "}
                  <Anchor component={Link} href={route("customer.balance")}>
                    página de saldo
                  </Anchor>{" "}
                  na sua conta e verificar o status do pagamento.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack>
                <Alert variant="light" color="yellow">
                  <Text>
                    Aguardando a confirmação do pagamento. A página será
                    atualizada em <b>{timer} segundos.</b>
                  </Text>
                </Alert>
                <Image
                  src={pix_qr_code}
                  alt={pix_code}
                  width={150}
                  height={150}
                  radius="md"
                />
                <TextInput
                  readOnly
                  defaultValue={pix_code}
                  mt="md"
                  rightSectionPointerEvents="none"
                  rightSection={
                    <CopyButton value={pix_qr_code} timeout={2000}>
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copiado" : "Copiar"}
                          withArrow
                          position="right"
                        >
                          <ActionIcon
                            color={copied ? "teal" : "gray"}
                            variant="subtle"
                            onClick={copy}
                          >
                            {copied ? (
                              <IconCheck size={16} />
                            ) : (
                              <IconCopy size={16} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  }
                  placeholder="PIX Copia e Cola"
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
      </Stack>
    </CustomerLayout>
  );
}
