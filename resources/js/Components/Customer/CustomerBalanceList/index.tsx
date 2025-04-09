import { moneyFormat } from "@/Utils/moneyFormat";
import { Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import dayjs from "dayjs";
import { Transaction } from "@/types";
import { transactionStatus } from "@/Components/Balance/BalanceList";

function CustomerBalanceList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      borderRadius="sm"
      records={transactions}
      columns={[
        {
          accessor: "id",
          title: "Código",
        },
        {
          accessor: "amount",
          title: "Valor",
          render: ({ amount }) => moneyFormat(amount),
        },
        {
          accessor: "transaction_type",
          title: "Tipo de Transação",
          render: ({ transaction_type }) => (
            <Badge color={transaction_type === "withdraw" ? "green" : "red"}>
              {transaction_type === "withdraw" ? "Saque" : "Depósito"}
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
          title: "Data",
          render: ({ created_at }) =>
            dayjs(created_at).format("DD/MM/YYYY HH:mm"),
        },
      ]}
    />
  );
}

export default CustomerBalanceList;
