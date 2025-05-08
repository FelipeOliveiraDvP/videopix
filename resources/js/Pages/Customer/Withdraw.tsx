import { usePageProps } from "@/hooks/usePageProps";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Package } from "@/types";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Alert,
  Anchor,
  Button,
  NumberInput,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FormEventHandler } from "react";

export default function Withdraw() {
  const { helpers, auth, current_package, total_transactions, can_withdraw } =
    usePageProps<{
      total_transactions: number;
      current_package: Package | null;
      can_withdraw: boolean;
    }>();

  const { data, setData, post, processing, errors, reset } = useForm({
    amount: 0,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("customer.withdraw.store"), {
      onFinish: () => reset("amount"),
    });
  };

  const calcAmountAvailable = () => {
    if (!current_package) return 0;

    const { withdraw_percentage, price } = current_package;
    return withdraw_percentage * price - total_transactions;
  };

  return (
    <CustomerLayout>
      <Head title="Sacar Valor" />

      <Paper p="md">
        <Stack>
          <div>
            <Title order={2}>Sacar Valor</Title>
            <Text c="dimmed" size="lg">
              Retire o valor do seu saldo e receba na sua conta.
            </Text>
          </div>
          <form onSubmit={submit}>
            <Stack gap="sm">
              <NumberInput
                label="Informe o valor que deseja sacar"
                placeholder="R$ 0,00"
                prefix="R$ "
                value={data.amount}
                onChange={(value) => setData("amount", value as number)}
                error={errors.amount}
                step={0.01}
                hideControls
                decimalScale={2}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                max={calcAmountAvailable()}
                min={0}
              />

              {can_withdraw ? (
                <Alert variant="light" color="yellow">
                  <Text size="sm">
                    Você ainda pode retirar{" "}
                    <b>{moneyFormat(calcAmountAvailable())}</b> essa semana.
                    Você pode aumentar esse limite agora realizando um upgrade
                    no seu pacote{" "}
                    <Anchor
                      component={Link}
                      href={route("customer.packages")}
                      c="primary"
                    >
                      clicando aqui.
                    </Anchor>
                  </Text>
                </Alert>
              ) : (
                <Alert variant="light" color="red">
                  <Text size="sm">
                    Você excedeu o limite de saque de{" "}
                    {moneyFormat(calcAmountAvailable())} do seu pacote essa
                    semana. Você pode aumentar esse limite realizando um upgrade
                    no seu pacote{" "}
                    <Anchor
                      component={Link}
                      c="primary"
                      href={route("customer.packages")}
                    >
                      clicando aqui.
                    </Anchor>
                  </Text>
                </Alert>
              )}

              <Title order={3} size="h4">
                Informações da conta
              </Title>
              <div>
                <Text size="sm">Titular</Text>
                <Text fw="bold">{auth.user.name}</Text>
              </div>
              <div>
                <Text size="sm">Chave PIX</Text>
                <Text fw="bold">{helpers.user_pix}</Text>
              </div>

              <Alert variant="light">
                <Text size="sm">
                  Você pode alterar os dados da sua conta{" "}
                  <Anchor
                    component={Link}
                    href={route("profile.edit")}
                    c="primary"
                  >
                    clicando aqui.
                  </Anchor>{" "}
                  Após a alteração, você pode voltar aqui e solicitar o saque
                  novamente.
                </Text>
              </Alert>

              <Button
                variant="gradient"
                size="lg"
                gradient={{ from: "orange", to: "yellow", deg: 219 }}
                type="submit"
                loading={processing}
                disabled={
                  processing ||
                  !can_withdraw ||
                  data.amount > calcAmountAvailable()
                }
              >
                Solicitar Saque
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </CustomerLayout>
  );
}
