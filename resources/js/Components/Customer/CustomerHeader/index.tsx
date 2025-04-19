import { Anchor, Box, Burger, Container, Group } from "@mantine/core";
import { Link } from "@inertiajs/react";
import Logo from "@/Components/Logo";
import CustomerButton from "../CustomerButton";
import classes from "./CustomerHeader.module.css";
import { usePageProps } from "@/hooks/usePageProps";
import CustomerPackage from "../CustomerPackage";

interface CustomerHeaderProps {
  opened: boolean;
  toggle: () => void;
}

function CustomerHeader({ opened, toggle }: CustomerHeaderProps) {
  const { helpers } = usePageProps();

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Group justify="space-between" align="center" w="100%">
          <Link href={route("customer.home")} className={classes.logo}>
            <Logo variant="white" width={64} />
          </Link>
          <Box visibleFrom="sm">
            <Group justify="flex-end">
              <Anchor component={Link} href={route("customer.home")}>
                Assistir Vídeos
              </Anchor>
              <Anchor component={Link} href={route("customer.balance")}>
                Meus Ganhos
              </Anchor>
              <Anchor component={Link} href={route("profile.edit")}>
                Minha Conta
              </Anchor>
            </Group>
          </Box>
          <Box visibleFrom="sm">
            <Group gap="md">
              <CustomerPackage />
              <CustomerButton />
            </Group>
          </Box>
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
        />
      </Container>
    </header>
  );
}

export default CustomerHeader;
