import AdminLayout from "@/Layouts/AdminLayout";
import { Package } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
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
  const { package: pack } = usePage<{ package: Package }>().props;
  const { data, setData, put, processing, errors, reset } = useForm({
    name: pack.name || "",
    price: pack.price || 0,
    withdraw_percentage: pack.withdraw_percentage || 0,
    duration_in_months: pack.duration_in_months || 1,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.packages.update", { id: pack.id }));
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
                  fixedDecimalScale
                  min={0}
                />
                <NumberInput
                  label="Porcentagem máxima de saque por semana %"
                  placeholder="0%"
                  suffix="%"
                  value={data.withdraw_percentage * 100}
                  onChange={(value) =>
                    setData("withdraw_percentage", (value as number) / 100)
                  }
                  error={errors.withdraw_percentage}
                  step={1}
                  decimalScale={0}
                  min={0}
                  max={100}
                />
                <NumberInput
                  label="Duração do pacote (em meses)"
                  placeholder="1 mês"
                  suffix=" mês"
                  value={data.duration_in_months}
                  onChange={(value) =>
                    setData("duration_in_months", value as number)
                  }
                  error={errors.duration_in_months}
                  step={1}
                  decimalScale={0}
                  min={1}
                  max={12}
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
