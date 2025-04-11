import CustomerBalanceList from "@/Components/Customer/CustomerBalanceList";
import StatsCard from "@/Components/StatsCard";
import CustomerLayout from "@/Layouts/CustomerLayout";
import {
  Balance as BalanceType,
  PaginatedResponse,
  Transaction,
} from "@/types";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button, Group, Stack } from "@mantine/core";

export default function Balance() {
  const { balance, transactions, views_count } = usePage<{
    views_count: number;
    balance: BalanceType;
    transactions: PaginatedResponse<Transaction>;
  }>().props;

  const formatViewsCount = (count: number) => {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1)}M`;
    } else if (count >= 1_000) {
      return `${(count / 1_000).toFixed(1)}k`;
    }
    return count.toString();
  };

  console.log(balance, transactions, views_count);

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
