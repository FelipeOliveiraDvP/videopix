import { PropsWithChildren } from "react";
import { AppShell, Burger, Container, Group, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import Providers from "@/Providers";
import Logo from "@/Components/Logo";
import CustomerHeader from "@/Components/CustomerHeader";

export default function CustomerLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Providers>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <CustomerHeader />
          {/* <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Logo />
              <Group ml="xl" gap={0} visibleFrom="sm">
                Informações do cliente
              </Group>
            </Group>
          </Group> */}
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          Informações do cliente
        </AppShell.Navbar>

        <AppShell.Main>
          <Container py="lg">{children}</Container>
        </AppShell.Main>
      </AppShell>
    </Providers>
  );
}
