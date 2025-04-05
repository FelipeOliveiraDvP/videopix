import VideoList from "@/Components/Videos/VideoList";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Index() {
  return (
    <AdminLayout>
      <Head title="Listar Videos" />

      <Paper>
        <Stack>
          <Group justify="space-between" align="center">
            <Title order={2}>Videos</Title>
            <Group>
              <Link href={route("admin.videos.create")}>
                <Button leftSection={<IconPlus size={16} />}>
                  Adicionar Video
                </Button>
              </Link>
            </Group>
          </Group>

          <VideoList />
        </Stack>
      </Paper>
    </AdminLayout>
  );
}
