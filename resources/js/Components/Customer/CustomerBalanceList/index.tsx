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
          title: "#",
          width: 80,
        },
        {
          accessor: "amount",
          title: "Valor",
          width: 120,
          render: ({ amount }) => moneyFormat(amount),
        },
        {
          accessor: "status",
          title: "Status",
          width: 100,
          render: ({ status }) => (
            <Badge variant="light" color={transactionStatus[status].color}>
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
              color={transaction_type === "deposit" ? "yellow" : "green"}
            >
              {transaction_type === "deposit" ? "Depósito" : "Retirada"}
            </Badge>
          ),
        },
        {
          accessor: "created_at",
          title: "Data",
          width: 150,
          render: ({ created_at }) =>
            dayjs(created_at).format("DD/MM/YYYY HH:mm"),
        },
      ]}
    />
  );
}

export default CustomerBalanceList;
