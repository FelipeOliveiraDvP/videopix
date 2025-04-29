import BalanceList from "@/Components/Balance/BalanceList";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import {
  Button,
  Drawer,
  Group,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";
import dayjs from "dayjs";
import { FormEventHandler } from "react";

export default function Balance() {
  const [opened, { toggle, close }] = useDisclosure();

  const { data, setData, processing, reset } = useForm({
    name: "",
    cpf: "",
    type: "",
    status: "",
    created_at: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    close();
    router.get(
      route("admin.balance"),
      { ...data },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
  };

  return (
    <AdminLayout>
      <Head title="Movimentações" />

      <Paper>
        <Stack>
          <Group justify="space-between" align="center">
            <Title order={2}>Movimentações</Title>
            <Group>
              <Button
                variant="outline"
                onClick={toggle}
                leftSection={<IconFilter size={16} />}
              >
                Filtros
              </Button>
            </Group>
          </Group>

          <BalanceList />
        </Stack>
      </Paper>

      <Drawer
        opened={opened}
        onClose={toggle}
        title={<Title order={3}>Filtros</Title>}
        position="right"
      >
        <form onSubmit={submit}>
          <Stack>
            <TextInput
              label="Nome do Cliente"
              placeholder="Digite o nome"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />

            <TextInput
              label="CPF do Cliente"
              placeholder="Digite o CPF"
              value={data.cpf}
              onChange={(e) => setData("cpf", e.target.value)}
            />
            <Select
              label="Tipo de movimentação"
              placeholder="Selecione um tipo"
              data={[
                {
                  value: "deposit",
                  label: "Depósito",
                },
                {
                  value: "withdraw",
                  label: "Retirada",
                },
              ]}
              value={data.type}
              onChange={(value) => setData("type", value || "")}
            />
            <Select
              label="Status"
              placeholder="Selecione um status"
              data={[
                {
                  value: "success",
                  label: "Sucesso",
                },
                {
                  value: "pending",
                  label: "Pendente",
                },
                {
                  value: "failed",
                  label: "Falha",
                },
              ]}
              value={data.status}
              onChange={(value) => setData("status", value || "")}
            />
            <DateInput
              label="Data de movimentação"
              placeholder="00/00/0000"
              valueFormat="DD/MM/YYYY"
              value={
                dayjs(data.created_at).isValid()
                  ? dayjs(data.created_at).toDate()
                  : null
              }
              onChange={(date) =>
                setData("created_at", dayjs(date).format("YYYY-MM-DD"))
              }
            />

            <Button type="submit" loading={processing}>
              Filtrar
            </Button>
            <Button
              variant="subtle"
              onClick={() => {
                reset();
                close();
                router.get(
                  route("admin.balance"),
                  {},
                  {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                  }
                );
              }}
            >
              Limpar Filtros
            </Button>
          </Stack>
        </form>
      </Drawer>
    </AdminLayout>
  );
}
