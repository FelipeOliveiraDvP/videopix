import { moneyFormat } from "@/Utils/moneyFormat";
import { Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import dayjs from "dayjs";

function CustomerBalanceList() {
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
          type: "withdraw",
          total: 150,
          created_at: "2025-04-03 08:15:36",
        },
        {
          id: 2,
          type: "deposit",
          total: 200,
          created_at: "2025-04-03 08:15:36",
        },
        {
          id: 3,
          type: "withdraw",
          total: 150,
          created_at: "2025-04-03 08:15:36",
        },
        {
          id: 4,
          type: "deposit",
          total: 200,
          created_at: "2025-04-03 08:15:36",
        },
      ]}
      columns={[
        {
          accessor: "type",
          title: "Tipo de Transação",
          render: ({ type }) => (
            <Badge color={type === "withdraw" ? "red" : "green"}>
              {type === "withdraw" ? "Saque" : "Depósito"}
            </Badge>
          ),
        },
        {
          accessor: "total",
          title: "Valor",
          render: ({ total }) => moneyFormat(total),
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
