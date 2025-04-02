import { Anchor, Box, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../Logo";
import { Link, usePage } from "@inertiajs/react";
import UserButton from "../UserButton";
import classes from "./CustomerHeader.module.css";

function CustomerHeader() {
  const { props } = usePage();
  const [opened, { toggle }] = useDisclosure(false);
  const { helpers } = props;

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Group justify="space-between" align="center" w="100%">
          <Link href={route(helpers.user_home)} className={classes.logo}>
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
          <UserButton />
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
