import { dummyPackages } from "@/dummy";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link } from "@inertiajs/react";
import {
  Button,
  Card,
  MantineColor,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";

export default function Packages() {
  const packageColors: MantineColor[] = [
    "orange.7",
    "blue.7",
    "green.7",
    "red.7",
    "violet.7",
  ];

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
            <Card key={pack.id}>
              <Card.Section p="md">
                <ThemeIcon
                  color={packageColors[index]}
                  variant="light"
                  size={38}
                  radius="md"
                >
                  <IconCoins />
                </ThemeIcon>
              </Card.Section>
              <Card.Section p="md">
                <Title order={4} mb="xs" fw="normal">
                  {pack.name}
                </Title>
                <Text style={{ fontSize: 28 }} fw={700} mb="xs">
                  {moneyFormat(pack.price)}
                </Text>
                <Text size="sm" c="dimmed">
                  Pode sacar até{" "}
                  {moneyFormat(pack.price * pack.withdraw_percentage)} por
                  semana
                </Text>
                <Button
                  variant="outline"
                  color={packageColors[index]}
                  component={Link}
                  href={route("customer.checkout", pack.id)}
                  fullWidth
                  mt="md"
                >
                  Contratar
                </Button>
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </CustomerLayout>
  );
}
