import { PropsWithChildren } from "react";
import { AppShell, Burger, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Providers from "@/Providers";

export default function AdminLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Providers>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 200, md: 300, lg: 400 },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
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
            <Text fw={700} size="xl" c="indigo">
              LOGO
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={true} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </Providers>
  );
}
