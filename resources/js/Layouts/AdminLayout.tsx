import { PropsWithChildren } from "react";
import { Alert, AppShell, Burger, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@inertiajs/react";
import Providers from "@/Providers";
import Logo from "@/Components/Logo";
import AdminNavbar from "@/Components/Admin/AdminNavbar";
import { usePageProps } from "@/hooks/usePageProps";
import { IconInfoCircle } from "@tabler/icons-react";

export default function AdminLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const {
    helpers,
    flash: { error, success },
  } = usePageProps();

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
            <Link href={route("customer.home")}>
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
        <AppShell.Main>
          <Stack>
            {error && (
              <Alert
                variant="light"
                color="red"
                withCloseButton
                title="Algum erro ocorreu"
                icon={<IconInfoCircle />}
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert
                variant="light"
                color="green"
                withCloseButton
                title="Sucesso"
                icon={<IconInfoCircle />}
              >
                {success}
              </Alert>
            )}
            {children}
          </Stack>
        </AppShell.Main>
      </AppShell>
    </Providers>
  );
}
