import VideoCard from "@/Components/Videos/VideoCard";
import { dummyVideos } from "@/dummy";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head, usePage } from "@inertiajs/react";
import { Grid, Stack, Title } from "@mantine/core";

export default function Home({ users_count }: { users_count: number }) {
  const { auth } = usePage().props;
  return (
    <CustomerLayout>
      <Head title="Home" />

      <Stack gap="xl">
        <Title order={2}>Continue assistindo</Title>
        <Grid>
          {dummyVideos.map((video) => (
            <Grid.Col key={video.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <VideoCard video={video} />
            </Grid.Col>
          ))}
        </Grid>
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
