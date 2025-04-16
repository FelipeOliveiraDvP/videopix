import VideoList from "@/Components/Videos/VideoList";
import AdminLayout from "@/Layouts/AdminLayout";
import { PaginatedResponse, Video } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { console } from "inspector";

export default function Index() {
  const { videos } = usePage<{
    videos: PaginatedResponse<Video>;
  }>().props;

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

          <VideoList videos={videos.data} />
        </Stack>
      </Paper>
    </AdminLayout>
  );
}
