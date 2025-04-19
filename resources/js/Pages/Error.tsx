import { usePageProps } from "@/hooks/usePageProps";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import Providers from "@/Providers";

type ErrorPageProps = PageProps<{
  status: number;
}>;

export default function ErrorPage({ status }: ErrorPageProps) {
  const { helpers } = usePageProps();

  const title = {
    503: "Serviço Indisponível",
    500: "Erro no Servidor",
    404: "Página Não Encontrada",
    403: "Proibido",
  }[status];

  const description = {
    503: "Desculpe, estamos fazendo alguma manutenção. Por favor, volte em breve.",
    500: "Ops, algo deu errado em nossos servidores.",
    404: "Desculpe, a página que você está procurando não pôde ser encontrada.",
    403: "Desculpe, você não tem permissão para acessar esta página.",
  }[status];

  return (
    <Providers>
      <Container>
        <Head title={title} />
        <Stack gap="lg" align="center" justify="center">
          <Text fw={900} styles={{ root: { fontSize: 120 } }} ta="center">
            {status}
          </Text>
          <Title>{title}</Title>
          <Text c="dimmed" size="lg" ta="center">
            {description}
          </Text>
          <Group justify="center">
            {/* TODO: Get the home by user role */}
            <Button
              variant="filled"
              component={Link}
              size="md"
              href={route("customer.home")}
            >
              Voltar para a home
            </Button>
          </Group>
        </Stack>
      </Container>
    </Providers>
  );
}
