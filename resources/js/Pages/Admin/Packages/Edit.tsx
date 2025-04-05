import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { FormEventHandler } from "react";

export default function Edit() {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: "",
    price: 0,
    withdraw_percentage: 0,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.packages.update", { id: 1 }));
  };

  return (
    <AdminLayout>
      <Head title="Editar Pacote" />

      <Paper>
        <Title order={2} mb="lg">
          <Group gap="xs" align="center">
            <ActionIcon
              variant="transparent"
              color="light"
              onClick={() => router.get(route("admin.packages.index"))}
            >
              <IconArrowLeft />
            </ActionIcon>
            Editar Pacote
          </Group>
        </Title>
        <Container mx={0} size="xs">
          <Stack>
            <form onSubmit={submit}>
              <Stack>
                <TextInput
                  label="Nome"
                  placeholder="Nome do pacote"
                  value={data.name}
                  onChange={(e) => setData("name", e.currentTarget.value)}
                  error={errors.name}
                />
                <NumberInput
                  label="Preço"
                  placeholder="R$ 0,00"
                  prefix="R$ "
                  value={data.price}
                  onChange={(value) => setData("price", value as number)}
                  error={errors.price}
                  step={0.01}
                  hideControls
                  decimalScale={2}
                  decimalSeparator=","
                  thousandSeparator="."
                  min={0}
                />
                <NumberInput
                  label="Porcentagem máxima de saque por semana %"
                  placeholder="0%"
                  suffix="%"
                  value={data.withdraw_percentage}
                  onChange={(value) =>
                    setData("withdraw_percentage", value as number)
                  }
                  error={errors.withdraw_percentage}
                  step={1}
                  decimalScale={0}
                  min={0}
                  max={100}
                />

                <Button type="submit" maw={250} loading={processing}>
                  Salvar
                </Button>
              </Stack>
            </form>
          </Stack>
        </Container>
      </Paper>
    </AdminLayout>
  );
}
