import { PropsWithChildren } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Providers from "@/Providers";
import Logo from "@/Components/Logo";
import AdminNavbar from "@/Components/AdminNavbar";
import { Link, usePage } from "@inertiajs/react";

export default function AdminLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const { helpers } = usePage().props;

  return (
    <Providers>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 250 },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Link href={route(helpers.user_home)}>
              <Logo variant="white" width={48} />
            </Link>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <AdminNavbar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </Providers>
  );
}
