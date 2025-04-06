import VideoCard from "@/Components/Videos/VideoCard";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { PaginatedResponse, Video } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Grid, Stack, Title } from "@mantine/core";

export default function Home() {
  const { videos, watched } = usePage<{
    watched: PaginatedResponse<Video>;
    videos: PaginatedResponse<Video>;
  }>().props;

  return (
    <CustomerLayout>
      <Head title="Home" />

      <Stack gap="xl">
        {watched.data.length > 0 && (
          <>
            <Title order={2}>Continue assistindo</Title>
            <Grid>
              {watched.data.map((video) => (
                <Grid.Col
                  key={video.id}
                  span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                >
                  <VideoCard video={video} />
                </Grid.Col>
              ))}
            </Grid>
          </>
        )}
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
