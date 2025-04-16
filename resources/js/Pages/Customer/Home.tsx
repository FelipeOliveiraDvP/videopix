import StatsCard from "@/Components/StatsCard";
import VideoCard from "@/Components/Videos/VideoCard";
import { usePageProps } from "@/hooks/usePageProps";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { PaginatedResponse, Video } from "@/types";
import { formatViewsCount } from "@/Utils/formatViewsCount";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, Link } from "@inertiajs/react";
import { Box, Grid, Group, Stack, Title, UnstyledButton } from "@mantine/core";

export default function Home() {
  const { helpers, auth, videos, watched, views_count } = usePageProps<{
    views_count: number;
    watched: PaginatedResponse<Video>;
    videos: PaginatedResponse<Video>;
  }>();

  return (
    <CustomerLayout>
      <Head title="Home" />

      <Stack gap="xl">
        <Title order={2}>Bem vindo, {auth.user.name}</Title>
        <Grid w="100%">
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <StatsCard
              type="balance"
              value={moneyFormat(helpers.user_balance)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <StatsCard type="views" value={formatViewsCount(views_count)} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            {helpers.user_package ? (
              <StatsCard
                type="packages"
                value={helpers.user_package.name}
                packageId={helpers.user_package.id}
              />
            ) : (
              <UnstyledButton
                component={Link}
                href={route("customer.packages")}
              >
                <StatsCard type="subscribe" value="Clique para assinar" />
              </UnstyledButton>
            )}
          </Grid.Col>
        </Grid>

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
        <Title order={2}>Vídeos mais recentes</Title>
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
