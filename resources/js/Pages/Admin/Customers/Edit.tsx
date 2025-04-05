import StatsCard from "@/Components/StatsCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowBack, IconArrowLeft } from "@tabler/icons-react";
import { FormEventHandler } from "react";

export default function Edit() {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    birth_date: "",
    cpf: "",
    pix: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.customers.update", { id: 1 }));
  };

  return (
    <AdminLayout>
      <Head title="Editar Cliente" />

      <Paper>
        <Title order={2} mb="lg">
          <Group gap="xs" align="center">
            <ActionIcon
              variant="transparent"
              color="light"
              onClick={() => router.get(route("admin.customers.index"))}
            >
              <IconArrowLeft />
            </ActionIcon>
            Editar Cliente
          </Group>
        </Title>
        <Container mx={0} size="lg">
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                <form onSubmit={submit}>
                  <Stack>
                    <TextInput
                      label="Nome"
                      placeholder="Nome do cliente"
                      value={data.name}
                      onChange={(e) => setData("name", e.currentTarget.value)}
                      error={errors.name}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Email do cliente"
                      value={data.email}
                      onChange={(e) => setData("email", e.currentTarget.value)}
                      error={errors.email}
                    />
                    <TextInput
                      label="Telefone"
                      placeholder="Telefone do cliente"
                      value={data.phone}
                      onChange={(e) => setData("phone", e.currentTarget.value)}
                      error={errors.phone}
                    />
                    <TextInput
                      label="Data de Nascimento"
                      placeholder="Data de nascimento do cliente"
                      value={data.birth_date}
                      onChange={(e) =>
                        setData("birth_date", e.currentTarget.value)
                      }
                      error={errors.birth_date}
                    />
                    <TextInput
                      label="CPF"
                      placeholder="CPF do cliente"
                      value={data.cpf}
                      onChange={(e) => setData("cpf", e.currentTarget.value)}
                      error={errors.cpf}
                    />
                    <TextInput
                      label="Pix"
                      placeholder="Pix do cliente"
                      value={data.pix}
                      onChange={(e) => setData("pix", e.currentTarget.value)}
                      error={errors.pix}
                    />
                    <Button type="submit" maw={250} loading={processing}>
                      Salvar
                    </Button>
                  </Stack>
                </form>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
                <SimpleGrid
                  cols={{ base: 2 }}
                  spacing={{ base: 10, sm: "xs" }}
                  verticalSpacing={{ base: "xs" }}
                >
                  <StatsCard type="packages" value="Prata - R$ 50,00" />
                  <StatsCard type="deposits" value="R$ 150,00" />
                  <StatsCard type="withdrawals" value="R$ 150,00" />
                  <StatsCard type="balance" value="R$ 0,00" />
                </SimpleGrid>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </Paper>
    </AdminLayout>
  );
}
