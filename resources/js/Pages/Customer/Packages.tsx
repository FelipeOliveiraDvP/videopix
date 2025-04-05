import PackageCard from "@/Components/Packages/PackageCard";
import { packageColors } from "@/constants";
import { dummyPackages } from "@/dummy";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link } from "@inertiajs/react";
import {
  Button,
  Card,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";

export default function Packages() {
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
          spacing={{ base: 10, sm: "sm" }}
          verticalSpacing={{ base: "sm" }}
        >
          {dummyPackages.map((pack, index) => (
            <PackageCard key={pack.id} pack={pack} index={index} />
          ))}
        </SimpleGrid>
      </Stack>
    </CustomerLayout>
  );
}
