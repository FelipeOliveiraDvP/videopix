import { packageColors } from "@/constants";
import { usePageProps } from "@/hooks/usePageProps";
import { Package } from "@/types";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Link } from "@inertiajs/react";
import { Button, Card, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";

function PackageCard({ pack, index }: { pack: Package; index?: number }) {
  const { auth } = usePageProps();

  return (
    <Card>
      <Card.Section p="md">
        <ThemeIcon
          color={packageColors[index || 0]}
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
          Pode sacar até {moneyFormat(pack.price * pack.withdraw_percentage)}{" "}
          por semana
        </Text>
        <Button
          variant="outline"
          color={packageColors[index || 0]}
          component={Link}
          href={
            auth.user?.role === "admin"
              ? route("admin.packages.edit", pack.id)
              : route("customer.checkout", pack.id)
          }
          fullWidth
          mt="md"
        >
          {auth.user?.role === "admin" ? "Editar" : "Contratar"}
        </Button>
      </Card.Section>
    </Card>
  );
}

export default PackageCard;
