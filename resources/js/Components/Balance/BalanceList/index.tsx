import { ActionIcon, Badge, Group, MantineColor, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { IconCancel, IconCheck, IconEye, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { modals } from "@mantine/modals";
import { router } from "@inertiajs/react";
import { TransactionStatus } from "@/types";

const transactionStatus: Record<
  TransactionStatus,
  { label: string; color: MantineColor }
> = {
  pending: {
    label: "Pendente",
    color: "yellow",
  },
  success: {
    label: "Sucesso",
    color: "green",
  },
  failed: {
    label: "Falha",
    color: "red",
  },
};

function BalanceList() {
  const confirmApprove = (id: number) =>
    modals.openConfirmModal({
      title: (
        <Text fw="bold">Deseja realmente aprovar a movimentação "{id}"?</Text>
      ),
      children: (
        <Text size="sm">
          Esta ação não pode ser desfeita. Você tem certeza de que deseja
          continuar?
        </Text>
      ),
      labels: { confirm: "Aprovar Movimentação", cancel: "Cancelar" },
      confirmProps: { color: "green" },
      cancelProps: { color: "gray", variant: "subtle" },
      onConfirm: () => router.patch(route("admin.balance.approve", id)),
    });

  const confirmReject = (id: number) =>
    modals.openConfirmModal({
      title: (
        <Text fw="bold">Deseja realmente rejeitar a movimentação "{id}"?</Text>
      ),
      children: (
        <Text size="sm">
          Esta ação não pode ser desfeita. Você tem certeza de que deseja
          continuar?
        </Text>
      ),
      labels: { confirm: "Rejeitar Movimentação", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      cancelProps: { color: "gray", variant: "subtle" },
      onConfirm: () => router.patch(route("admin.balance.reject", id)),
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
          customer: "Lucas Oliveira",
          type: "deposit",
          status: "pending" as TransactionStatus,
          amount: 100,
          created_at: "2025-04-03 08:15:36",
        },
        {
          id: 2,
          customer: "Mariana Silva",
          type: "withdraw",
          status: "success" as TransactionStatus,
          amount: 50,
          created_at: "2025-04-04 10:30:45",
        },
        {
          id: 3,
          customer: "Carlos Souza",
          type: "deposit",
          status: "failed" as TransactionStatus,
          amount: 200,
          created_at: "2025-04-05 14:20:10",
        },
      ]}
      columns={[
        {
          accessor: "id",
          title: "Código",
        },
        {
          accessor: "customer",
          title: "Cliente",
        },
        {
          accessor: "type",
          title: "Tipo de movimentação",
          render: ({ type }) => (
            <Badge
              variant="transparent"
              color={type === "deposit" ? "green" : "red"}
            >
              {type === "deposit" ? "Depósito" : "Retirada"}
            </Badge>
          ),
        },
        {
          accessor: "status",
          title: "Status",
          render: ({ status }) => (
            <Badge color={transactionStatus[status].color}>
              {transactionStatus[status].label}
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
          render: (item) =>
            item.status === "pending" && (
              <Group gap="xs" justify="flex-end">
                <ActionIcon
                  variant="light"
                  color="green"
                  size="lg"
                  title="Aprovar movimentação"
                  onClick={() => confirmApprove(item.id)}
                >
                  <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  color="red"
                  size="lg"
                  title="Rejeitar movimentação"
                  onClick={() => confirmReject(item.id)}
                >
                  <IconCancel size={16} />
                </ActionIcon>
              </Group>
            ),
        },
      ]}
    />
  );
}

export default BalanceList;
