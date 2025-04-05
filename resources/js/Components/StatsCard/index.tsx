import { Group, MantineColor, Paper, Text, ThemeIcon } from "@mantine/core";
import {
  IconCoin,
  IconEye,
  IconWallet,
  IconStackPush,
  IconUserPlus,
  IconChartLine,
  IconPackage,
} from "@tabler/icons-react";
import { ReactNode } from "react";

type StatType =
  | "balance"
  | "views"
  | "deposits"
  | "withdrawals"
  | "invites"
  | "conversion"
  | "packages";

interface StatsCardProps {
  value: string;
  type: StatType;
}

const stats: Record<
  StatType,
  { title: string; icon: ReactNode; color: MantineColor }
> = {
  balance: {
    title: "Saldo",
    icon: <IconCoin size={28} stroke={1.5} />,
    color: "teal",
  },
  views: {
    title: "Visualizações",
    icon: <IconEye size={28} stroke={1.5} />,
    color: "blue",
  },
  deposits: {
    title: "Depósitos",
    icon: <IconWallet size={28} stroke={1.5} />,
    color: "green",
  },
  withdrawals: {
    title: "Retiradas",
    icon: <IconStackPush size={28} stroke={1.5} />,
    color: "red",
  },
  invites: {
    title: "Convites",
    icon: <IconUserPlus size={28} stroke={1.5} />,
    color: "orange",
  },
  conversion: {
    title: "Conversão",
    icon: <IconChartLine size={28} stroke={1.5} />,
    color: "lime",
  },
  packages: {
    title: "Pacote",
    icon: <IconPackage size={28} stroke={1.5} />,
    color: "violet",
  },
};

function StatsCard({ type, value }: StatsCardProps) {
  return (
    <Paper withBorder p={{ base: "sm", md: "md" }} radius="md">
      <Group justify="space-between" align="start">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
            {stats[type].title}
          </Text>
          <Text fw={700} fz="xl">
            {value}
          </Text>
        </div>
        <ThemeIcon
          color={stats[type].color}
          variant="light"
          size={38}
          radius="md"
        >
          {stats[type].icon}
        </ThemeIcon>
      </Group>
    </Paper>
  );
}
export default StatsCard;
