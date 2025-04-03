import CustomerLayout from "@/Layouts/CustomerLayout";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link, useForm } from "@inertiajs/react";
import {
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
  const { data, setData, post, processing, errors, reset } = useForm({
    amount: 0,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("customer.withdraw.store"), {
      onFinish: () => reset("amount"),
    });
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
              />
              <Text c="dimmed" size="sm">
                Você ainda pode retirar {moneyFormat(0)} essa semana. Você pode
                aumentar esse limite realizando um upgrade no seu pacote{" "}
                <Anchor component={Link} href={route("customer.packages")}>
                  clicando aqui.
                </Anchor>
              </Text>
              <Title order={3} size="h4">
                Informações da conta
              </Title>
              <div>
                <Text fw="bold">Titular</Text>
                <Text size="sm">Nome</Text>
              </div>
              <div>
                <Text fw="bold">Chave PIX</Text>
                <Text size="sm">Nome</Text>
              </div>
              <Text c="dimmed" size="sm">
                Você pode alterar os dados da sua conta{" "}
                <Anchor component={Link} href={route("profile.edit")}>
                  clicando aqui.
                </Anchor>{" "}
                Após a alteração, você pode voltar aqui e solicitar o saque
                novamente.
              </Text>
              <Button
                variant="gradient"
                size="lg"
                gradient={{ from: "orange", to: "yellow", deg: 219 }}
                type="submit"
                loading={processing}
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
