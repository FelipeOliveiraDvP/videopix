import PackageCard from "@/Components/Packages/PackageCard";

import CustomerLayout from "@/Layouts/CustomerLayout";
import { Package } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { SimpleGrid, Stack, Text, Title } from "@mantine/core";

export default function Packages() {
  const { packages } = usePage<{
    packages: Package[];
  }>().props;

  return (
    <CustomerLayout>
      <Head title="Pacotes" />

      <Stack gap="lg">
        <div>
          <Title order={2}>Contratar Pacote</Title>
          <Text c="dimmed" size="lg">
            Para poder sacar o valor do seu saldo, você precisa contratar um
            pacote.
          </Text>
        </div>
        <SimpleGrid
          cols={{ base: 2, md: 2, lg: 5 }}
          spacing={{ base: "sm", sm: "lg" }}
          verticalSpacing={{ base: "sm" }}
        >
          {packages.map((pack, index) => (
            <PackageCard key={pack.id} pack={pack} index={index + 1} />
          ))}
        </SimpleGrid>
      </Stack>
    </CustomerLayout>
  );
}
