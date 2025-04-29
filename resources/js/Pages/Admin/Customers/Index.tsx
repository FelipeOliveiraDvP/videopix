import CustomersInviteModal from "@/Components/Customers/CustomersInviteModal";
import CustomersList from "@/Components/Customers/CustomersList";
import AdminLayout from "@/Layouts/AdminLayout";
import { Customer, PaginatedResponse } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
  Button,
  Checkbox,
  Drawer,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter, IconUserPlus } from "@tabler/icons-react";
import { FormEventHandler } from "react";

export default function Index() {
  const { customers } = usePage<{ customers: PaginatedResponse<Customer> }>()
    .props;
  const [filtersOpened, { toggle: toggleFilters, close: closeFilters }] =
    useDisclosure();
  const [inviteOpened, { toggle: toggleInviteModal, close: closeInviteModal }] =
    useDisclosure();

  const { data, setData, reset, processing, submit } = useForm({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    active: false as boolean,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit("get", route("admin.customers.index"), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const handleClear = () => {
    reset();
    router.get(
      route("admin.customers.index"),
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
    closeFilters();
  };

  return (
    <AdminLayout>
      <Head title="Listar Clientes" />

      <Paper>
        <Stack>
          <Group justify="space-between" align="center">
            <Title order={2}>Clientes</Title>
            <Group>
              <Button
                variant="outline"
                onClick={toggleFilters}
                leftSection={<IconFilter size={16} />}
              >
                Filtros
              </Button>
              <Button
                onClick={toggleInviteModal}
                leftSection={<IconUserPlus size={16} />}
              >
                Convidar Clientes
              </Button>
            </Group>
          </Group>

          <CustomersList customers={customers.data} />
        </Stack>
      </Paper>

      <Drawer
        opened={filtersOpened}
        onClose={toggleFilters}
        title={<Title order={3}>Filtros</Title>}
        position="right"
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Nome"
              placeholder="Nome do cliente"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            <TextInput
              label="E-mail"
              placeholder="E-mail do cliente"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            <TextInput
              label="CPF"
              placeholder="CPF do cliente"
              value={data.cpf}
              onChange={(e) => setData("cpf", e.target.value)}
            />
            <TextInput
              label="Telefone"
              placeholder="Telefone do cliente"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
            />
            <Checkbox
              label="Ativo"
              checked={data.active}
              onChange={(e) => setData("active", e.currentTarget.checked)}
            />
            <Button type="submit" loading={processing}>
              Filtrar
            </Button>
            <Button variant="subtle" onClick={handleClear}>
              Limpar Filtros
            </Button>
          </Stack>
        </form>
      </Drawer>
      <CustomersInviteModal opened={inviteOpened} onClose={closeInviteModal} />
    </AdminLayout>
  );
}
