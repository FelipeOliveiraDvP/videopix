import Providers from "@/Providers";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";

type ErrorPageProps = PageProps<{
  status: number;
}>;

export default function ErrorPage({ status }: ErrorPageProps) {
  /**
   * Alternative way to get the status code using the `usePage` hook.
   *
   * `const { status } = usePage().props;`
   *
   * [Read more](https://inertiajs.com/error-handling)
   */

  const title = {
    503: "503: Serviço Indisponível",
    500: "500: Erro no Servidor",
    404: "404: Página Não Encontrada",
    403: "403: Proibido",
  }[status];

  const description = {
    503: "Desculpe, estamos fazendo alguma manutenção. Por favor, volte em breve.",
    500: "Ops, algo deu errado em nossos servidores.",
    404: "Desculpe, a página que você está procurando não pôde ser encontrada.",
    403: "Desculpe, você não tem permissão para acessar esta página.",
  }[status];

  return (
    <Providers>
      <Container h="100%">
        <Head title={title} />
        <Stack gap="lg" align="center" justify="center" mt={100}>
          <Text size="xl" fw={900}>
            {status}
          </Text>
          <Title>{title}</Title>
          <Text c="dimmed" size="lg" ta="center">
            {description}
          </Text>
          <Group justify="center">
            {/* TODO: Get the home by user role */}
            <Button
              variant="subtle"
              component={Link}
              size="md"
              href={route("admin.dashboard")}
            >
              Voltar para a home
            </Button>
          </Group>
        </Stack>
      </Container>
    </Providers>
  );
}
