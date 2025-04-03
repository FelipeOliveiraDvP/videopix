import { PropsWithChildren } from "react";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Providers from "@/Providers";
import CustomerHeader from "@/Components/Customer/CustomerHeader";
import CustomerNavbar from "@/Components/Customer/CustomerNavbar";

export default function CustomerLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

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
          <Container py="lg">{children}</Container>
        </AppShell.Main>
      </AppShell>
    </Providers>
  );
}
