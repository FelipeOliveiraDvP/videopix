import StatsCard from "@/Components/StatsCard";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Group, Stack } from "@mantine/core";

export default function Balance() {
  return (
    <CustomerLayout>
      <Head title="Meus Ganhos" />

      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Group>
            <StatsCard type="balance" value="R$ 0,00" />
            <StatsCard type="views" value="123k" />
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
      </Stack>
    </CustomerLayout>
  );
}
