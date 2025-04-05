import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { FormEventHandler } from "react";

export default function Edit() {
  const { data, setData, put, processing, errors, reset } = useForm({
    url: "",
    price: 0,
    duration_time: 0,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.videos.update", { ...data }));
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
        <Container mx={0} size="xs">
          <Stack>
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
                <Button type="submit" maw={250} loading={processing}>
                  Salvar
                </Button>
              </Stack>
            </form>
          </Stack>
        </Container>
      </Paper>
    </AdminLayout>
  );
}
