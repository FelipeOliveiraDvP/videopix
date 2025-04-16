import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { IconEye, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { modals } from "@mantine/modals";
import { router } from "@inertiajs/react";
import { Customer } from "@/types";

function CustomersList({ customers }: { customers: Customer[] }) {
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
      records={customers}
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
          accessor: "cpf",
          title: "CPF",
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
              {/* <ActionIcon
                variant="light"
                color="red"
                size="lg"
                title="Excluir cliente"
                onClick={() => confirmRemove(item)}
              >
                <IconTrash size={16} />
              </ActionIcon> */}
            </Group>
          ),
        },
      ]}
    />
  );
}

export default CustomersList;
