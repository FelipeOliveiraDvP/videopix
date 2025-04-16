import { Anchor, Divider, Stack } from "@mantine/core";
import { Link } from "@inertiajs/react";

import CustomerButton from "../CustomerButton";
import CustomerPackage from "../CustomerPackage";

function CustomerNavbar() {
  return (
    <Stack gap="lg">
      <CustomerButton />
      <CustomerPackage />
      <Divider />
      <Stack>
        <Anchor component={Link} href={route("customer.home")}>
          Assistir Vídeos
        </Anchor>
        <Anchor component={Link} href={route("customer.balance")}>
          Meus Ganhos
        </Anchor>
        <Anchor component={Link} href={route("profile.edit")}>
          Minha Conta
        </Anchor>
      </Stack>
    </Stack>
  );
}

export default CustomerNavbar;
