import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { IconEye, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { modals } from "@mantine/modals";
import { router } from "@inertiajs/react";

function CustomersList() {
  const confirmRemove = (customer: { id: number; name: string }) =>
    modals.openConfirmModal({
      title: (
        <Text fw="bold">
          Deseja realmente excluir o(a) cliente "{customer.name}"?
        </Text>
      ),
      children: (
        <Text size="sm">
          Esta ação não pode ser desfeita. Você tem certeza de que deseja
          continuar?
        </Text>
      ),
      labels: { confirm: "Excluir Cliente", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      cancelProps: { color: "gray", variant: "subtle" },
      onConfirm: () =>
        router.delete(route("admin.customers.destroy", customer.id)),
    });

  return (
    <DataTable
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      records={[
        {
          id: 1,
          name: "Lucas Oliveira",
          email: "lucas.oliveira@gmail.com",
          phone: "11987654321",
          active: true,
          created_at: "2025-04-03 08:15:36",
        },
        {
          id: 2,
          name: "Mariana Silva",
          email: "mariana.silva@gmail.com",
          phone: "21987654321",
          active: false,
          created_at: "2025-04-04 10:30:45",
        },
        {
          id: 3,
          name: "Carlos Souza",
          email: "carlos.souza@gmail.com",
          phone: "31987654321",
          active: true,
          created_at: "2025-04-05 14:20:10",
        },
        {
          id: 4,
          name: "Fernanda Lima",
          email: "fernanda.lima@gmail.com",
          phone: "41987654321",
          active: true,
          created_at: "2025-04-06 16:45:00",
        },
        {
          id: 5,
          name: "João Pereira",
          email: "joao.pereira@gmail.com",
          phone: "51987654321",
          active: false,
          created_at: "2025-04-07 18:15:25",
        },
      ]}
      columns={[
        {
          accessor: "name",
          title: "Nome",
        },
        {
          accessor: "email",
          title: "E-mail",
        },
        {
          accessor: "phone",
          title: "Telefone",
        },
        {
          accessor: "active",
          title: "Status",
          render: ({ active }) => (
            <Badge color={active ? "green" : "red"}>
              {active ? "Ativo" : "Inativo"}
            </Badge>
          ),
        },
        {
          accessor: "created_at",
          title: "Data do cadastro",
          render: ({ created_at }) =>
            dayjs(created_at).format("DD/MM/YYYY HH:mm"),
        },
        {
          accessor: "actions",
          title: "Ações",
          noWrap: true,
          textAlign: "right",
          render: (item) => (
            <Group gap="xs" justify="flex-end">
              <ActionIcon
                variant="light"
                color="blue"
                size="lg"
                title="Editar cliente"
                onClick={() =>
                  router.get(route("admin.customers.edit", item.id))
                }
              >
                <IconEye size={16} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                color="red"
                size="lg"
                title="Excluir cliente"
                onClick={() => confirmRemove(item)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
    />
  );
}

export default CustomersList;
