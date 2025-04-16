import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { Link } from "@inertiajs/react";
import { IconCoin, IconLogout, IconStackPush } from "@tabler/icons-react";
import { moneyFormat } from "@/Utils/moneyFormat";
import { usePageProps } from "@/hooks/usePageProps";

function CustomerButton() {
  const { auth, helpers } = usePageProps();

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500} c="dimmed">
                {auth.user.name}
              </Text>

              <Text size="lg" fw={500}>
                {moneyFormat(helpers.user_balance)}
              </Text>
            </div>
            <Avatar radius="xl" color="primary.5" variant="filled">
              {auth.user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href={route("customer.packages")}
          leftSection={<IconCoin size={14} />}
        >
          Ver Pacotes
        </Menu.Item>
        <Menu.Item
          component={Link}
          href={route("customer.withdraw")}
          leftSection={<IconStackPush size={14} />}
        >
          Sacar Agora
        </Menu.Item>
        <Menu.Item
          component={Link}
          method="post"
          href={route("logout")}
          color="red"
          leftSection={<IconLogout size={14} />}
        >
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default CustomerButton;
