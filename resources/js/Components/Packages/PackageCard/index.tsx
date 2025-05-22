import { packageColors } from "@/constants";
import { usePageProps } from "@/hooks/usePageProps";
import { Package } from "@/types";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Link, router } from "@inertiajs/react";
import {
  Button,
  Card,
  lighten,
  MantineColor,
  parseThemeColor,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";
import { useState } from "react";

function PackageCard({ pack, index }: { pack: Package; index?: number }) {
  const { auth } = usePageProps();
  const mainColor = packageColors[index || 0] as MantineColor;
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({ color: mainColor, theme });
  const [loading, setLoading] = useState(false);

  router.on("start", () => {
    setLoading(true);
  });

  router.on("finish", () => {
    setLoading(false);
  });
  return (
    <Card
      styles={{
        root: {
          borderColor: mainColor,
          boxShadow: `0px 0px 8px 3px ${lighten(parsedColor.value, 0.2)}`,
        },
      }}
    >
      <Card.Section p="md">
        <ThemeIcon color={mainColor} variant="light" size={38} radius="md">
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
          loading={loading}
          variant="filled"
          color={mainColor}
          component={Link}
          method={auth.user?.role === "admin" ? "get" : "post"}
          href={
            auth.user?.role === "admin"
              ? route("admin.packages.edit", pack.id)
              : route("customer.checkout.store", pack.id)
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
