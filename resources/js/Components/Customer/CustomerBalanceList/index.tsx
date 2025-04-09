import { moneyFormat } from "@/Utils/moneyFormat";
import { Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import dayjs from "dayjs";
import { Transaction } from "@/types";

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
          accessor: "transaction_type",
          title: "Tipo de Transação",
          render: ({ transaction_type }) => (
            <Badge color={transaction_type === "withdraw" ? "red" : "green"}>
              {transaction_type === "withdraw" ? "Saque" : "Depósito"}
            </Badge>
          ),
        },
        {
          accessor: "amount",
          title: "Valor",
          render: ({ amount }) => moneyFormat(amount),
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
