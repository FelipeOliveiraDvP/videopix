import { packageColors } from "@/constants";
import { usePageProps } from "@/hooks/usePageProps";
import { Link } from "@inertiajs/react";
import {
  Group,
  lighten,
  MantineColor,
  Paper,
  parseThemeColor,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";

function CustomerPackage() {
  const {
    helpers: { user_package },
  } = usePageProps();
  const hasPackage = !!user_package;
  const mainColor = packageColors[
    hasPackage ? user_package.id : 0
  ] as MantineColor;
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({ color: mainColor, theme });

  return (
    <Tooltip label="Ver Pacotes" position="bottom" withArrow>
      <Paper
        component={Link}
        href={route("customer.packages")}
        withBorder
        p="xs"
        radius="md"
        styles={{
          root: {
            borderColor: mainColor,
            boxShadow: `0px 0px 8px 3px ${lighten(parsedColor.value, 0.2)}`,
          },
        }}
      >
        <Group gap="xs" align="start">
          <ThemeIcon color={mainColor} variant="light" size={24} radius="md">
            <IconPackage size={28} stroke={1.5} />
          </ThemeIcon>
          <div>
            <Text fw={700} fz="sm" c={mainColor}>
              {hasPackage ? user_package.name : "Assinar Pacote"}
            </Text>
          </div>
        </Group>
      </Paper>
    </Tooltip>
  );
}
export default CustomerPackage;
