import { PropsWithChildren } from "react";
import { AppShell, Burger, Group, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import Providers from "@/Providers";

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
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Text fw={700} size="xl" c="indigo">
                LOGO
              </Text>
              <Group ml="xl" gap={0} visibleFrom="sm">
                Informações do cliente
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          Informações do cliente
        </AppShell.Navbar>

        <AppShell.Main>
          <Tabs defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
                Gallery
              </Tabs.Tab>
              <Tabs.Tab
                value="messages"
                leftSection={<IconMessageCircle size={12} />}
              >
                Messages
              </Tabs.Tab>
              <Tabs.Tab
                value="settings"
                leftSection={<IconSettings size={12} />}
              >
                Settings
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

            <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

            <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
          </Tabs>
          {children}
        </AppShell.Main>
      </AppShell>
    </Providers>
  );
}
