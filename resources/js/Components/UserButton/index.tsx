import { IconChevronRight } from "@tabler/icons-react";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { Link, usePage } from "@inertiajs/react";
import { IconLogout } from "@tabler/icons-react";

function UserButton() {
  const { auth } = usePage().props;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Avatar radius="xl" color="cyan.7">
              {auth.user.name.charAt(0).toUpperCase()}
            </Avatar>

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {auth.user.name}
              </Text>

              <Text c="dimmed" size="xs">
                {auth.user.email}
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
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

export default UserButton;
