import { ActionIcon, Badge, Group, MantineColor, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { IconCancel, IconCheck, IconEye, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { modals } from "@mantine/modals";
import { router } from "@inertiajs/react";
import { PaginatedResponse, Transaction, TransactionStatus } from "@/types";
import { usePageProps } from "@/hooks/usePageProps";
import { moneyFormat } from "@/Utils/moneyFormat";

export const transactionStatus: Record<
  TransactionStatus,
  { label: string; color: MantineColor }
> = {
  pending: {
    label: "Pendente",
    color: "yellow",
  },
  completed: {
    label: "Sucesso",
    color: "green",
  },
  failed: {
    label: "Falha",
    color: "red",
  },
};

function BalanceList() {
  const { transactions } = usePageProps<{
    transactions: PaginatedResponse<Transaction>;
  }>();

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
      records={transactions.data}
      columns={[
        {
          accessor: "id",
          title: "#",
          width: 80,
        },
        {
          accessor: "user.name",
          title: "Cliente",
          width: 200,
        },
        {
          accessor: "status",
          title: "Status",
          width: 100,
          render: ({ status }) => (
            <Badge color={transactionStatus[status].color}>
              {transactionStatus[status].label}
            </Badge>
          ),
        },
        {
          accessor: "type",
          title: "Tipo",
          width: 100,
          render: ({ transaction_type }) => (
            <Badge
              variant="transparent"
              color={transaction_type === "deposit" ? "green" : "red"}
            >
              {transaction_type === "deposit" ? "Depósito" : "Retirada"}
            </Badge>
          ),
        },
        {
          accessor: "amount",
          title: "Valor",
          width: 120,
          render: ({ amount }) => moneyFormat(amount),
        },

        {
          accessor: "created_at",
          title: "Data da transação",
          width: 150,
          render: ({ created_at }) =>
            dayjs(created_at).format("DD/MM/YYYY HH:mm"),
        },
        {
          accessor: "actions",
          title: "",
          width: 100,
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
