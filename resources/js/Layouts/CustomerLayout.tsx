import { PropsWithChildren } from "react";
import { Alert, AppShell, Container, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Providers from "@/Providers";
import CustomerHeader from "@/Components/Customer/CustomerHeader";
import CustomerNavbar from "@/Components/Customer/CustomerNavbar";
import { usePageProps } from "@/hooks/usePageProps";
import { IconInfoCircle } from "@tabler/icons-react";

export default function CustomerLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const {
    flash: { error, success },
  } = usePageProps();

  return (
    <Providers>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <CustomerHeader opened={opened} toggle={toggle} />
        </AppShell.Header>

        <AppShell.Navbar p="xl">
          <CustomerNavbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Stack mb="md">
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
          </Stack>
          <Container py="lg">{children}</Container>
        </AppShell.Main>
      </AppShell>
    </Providers>
  );
}
