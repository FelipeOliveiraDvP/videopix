import AdminLayout from "@/Layouts/AdminLayout";
import { Video } from "@/types";
import { getDurationInMinutes } from "@/Utils/getDurationInMinutes";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
  ActionIcon,
  AspectRatio,
  Button,
  Container,
  Grid,
  Group,
  NumberInput,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { FormEventHandler } from "react";
import ReactPlayer from "react-player";

export default function Edit() {
  const { video } = usePage<{ video: Video }>().props;

  const { data, setData, put, processing, errors, reset } = useForm({
    url: video?.url || "",
    price: video?.price || 0,
    duration: video?.duration || 0,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.videos.update", video.id));
  };

  return (
    <AdminLayout>
      <Head title="Editar Vídeo" />

      <Paper>
        <Title order={2} mb="lg">
          <Group gap="xs" align="center">
            <ActionIcon
              variant="transparent"
              color="light"
              onClick={() => router.get(route("admin.videos.index"))}
            >
              <IconArrowLeft />
            </ActionIcon>
            Editar Vídeo
          </Group>
        </Title>
        <Container mx={0} fluid>
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <form onSubmit={submit}>
                  <Stack>
                    <TextInput
                      label="URL do vídeo"
                      placeholder="https://www.youtube.com/watch?v=XXXXXXXXX"
                      value={data.url}
                      onChange={(e) => setData("url", e.currentTarget.value)}
                      error={errors.url}
                    />
                    <NumberInput
                      label="Preço"
                      placeholder="R$ 0,00"
                      prefix="R$ "
                      value={data.price}
                      onChange={(value) => setData("price", value as number)}
                      error={errors.price}
                      step={0.01}
                      hideControls
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator="."
                      min={0}
                    />
                    <TextInput
                      label="Duração"
                      placeholder="https://www.youtube.com/watch?v=XXXXXXXXX"
                      value={getDurationInMinutes(data.duration)}
                      onChange={(e) => setData("duration", 0)}
                      readOnly
                    />
                    <Button type="submit" maw={250} loading={processing}>
                      Salvar
                    </Button>
                  </Stack>
                </form>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <AspectRatio
                  ratio={16 / 9}
                  style={(theme) => ({ borderRadius: theme.radius.md })}
                >
                  <ReactPlayer
                    url={data.url}
                    width="100%"
                    height="auto"
                    controls={false}
                    onDuration={(duration) => {
                      setData("duration", duration);
                    }}
                  />
                </AspectRatio>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </Paper>
    </AdminLayout>
  );
}
