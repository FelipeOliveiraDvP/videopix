import VideoCard from "@/Components/Videos/VideoCard";
import VideoPlayer from "@/Components/Videos/VideoPlayer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { PaginatedResponse, Video } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Grid, Stack, Title } from "@mantine/core";

export default function Watch() {
  const { video, videos } = usePage<{
    video: Video;
    videos: PaginatedResponse<Video>;
  }>().props;

  return (
    <CustomerLayout>
      <Head title="Assistir Vídeo" />

      <Stack gap="xl">
        <VideoPlayer video={video} />
        <Title order={2}>Últimos Vídeos</Title>
        <Grid>
          {videos.data.map((video) => (
            <Grid.Col key={video.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <VideoCard video={video} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </CustomerLayout>
  );
}
