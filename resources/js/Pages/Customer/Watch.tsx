import VideoCard from "@/Components/Videos/VideoCard";
import VideoPlayer from "@/Components/Videos/VideoPlayer";
import { dummyVideos } from "@/dummy";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { Grid, Stack, Title } from "@mantine/core";

export default function Watch() {
  return (
    <CustomerLayout>
      <Head title="Assistir Vídeo" />

      <Stack gap="xl">
        <VideoPlayer />
        <Title order={2}>Últimos Vídeos</Title>
        <Grid>
          {dummyVideos.map((video) => (
            <Grid.Col key={video.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <VideoCard video={video} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </CustomerLayout>
  );
}
