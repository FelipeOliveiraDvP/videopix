import CustomerBalanceList from "@/Components/Customer/CustomerBalanceList";
import StatsCard from "@/Components/StatsCard";
import { usePageProps } from "@/hooks/usePageProps";
import CustomerLayout from "@/Layouts/CustomerLayout";
import {
  Balance as BalanceType,
  PaginatedResponse,
  Transaction,
} from "@/types";
import { formatViewsCount } from "@/Utils/formatViewsCount";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button, Group, Stack } from "@mantine/core";

export default function Balance() {
  const { balance, transactions, views_count } = usePageProps<{
    views_count: number;
    balance: BalanceType;
    transactions: PaginatedResponse<Transaction>;
  }>();

  return (
    <CustomerLayout>
      <Head title="Meus Ganhos" />

      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Group>
            <StatsCard type="balance" value={moneyFormat(balance.amount)} />
            <StatsCard type="views" value={formatViewsCount(views_count)} />
          </Group>
          <Button
            variant="gradient"
            component={Link}
            href={route("customer.withdraw")}
            size="lg"
            gradient={{ from: "orange", to: "yellow", deg: 219 }}
          >
            Sacar Agora
          </Button>
        </Group>
        <CustomerBalanceList transactions={transactions.data} />
      </Stack>
    </CustomerLayout>
  );
}
