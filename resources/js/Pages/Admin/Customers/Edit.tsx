import StatsCard from "@/Components/StatsCard";
import { usePageProps } from "@/hooks/usePageProps";
import AdminLayout from "@/Layouts/AdminLayout";
import { Customer, Package } from "@/types";
import { moneyFormat } from "@/Utils/moneyFormat";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Group,
  InputBase,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconArrowLeft } from "@tabler/icons-react";
import { FormEventHandler } from "react";
import { IMaskInput } from "react-imask";
import dayjs from "dayjs";

export default function Edit() {
  const { customer, customer_package, packages, deposits, withdraws, balance } =
    usePageProps<{
      customer: Customer;
      packages: Package[];
      customer_package: Package | null;
      withdraws: number;
      deposits: number;
      balance: number;
    }>();

  const { data, setData, put, processing, errors, reset } = useForm({
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    birth_date: customer.birth_date || "",
    cpf: customer.cpf || "",
    pix: customer.pix || "",
    package_id: customer_package?.id || "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.customers.update", { id: customer.id }));
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
                    <InputBase
                      label="Telefone"
                      placeholder="(00) 00000-0000"
                      component={IMaskInput}
                      mask="(00) 00000-0000"
                      value={data.phone}
                      onChange={(e) => setData("phone", e.currentTarget.value)}
                      error={errors.phone}
                    />
                    <DateInput
                      label="Data de nascimento"
                      placeholder="00/00/0000"
                      valueFormat="DD/MM/YYYY"
                      value={
                        dayjs(data.birth_date).isValid()
                          ? dayjs(data.birth_date).toDate()
                          : null
                      }
                      onChange={(date) =>
                        setData("birth_date", dayjs(date).format("YYYY-MM-DD"))
                      }
                      error={errors.birth_date}
                    />
                    <InputBase
                      label="CPF"
                      placeholder="000.000.000-00"
                      component={IMaskInput}
                      mask="000.000.000-00"
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
                    <Select
                      label="Pacote"
                      placeholder="Selecione um pacote"
                      data={packages.map((pkg) => ({
                        value: String(pkg.id),
                        label: `${pkg.name} - ${moneyFormat(pkg.price)}`,
                      }))}
                      value={String(data.package_id)}
                      onChange={(value) => setData("package_id", value || "")}
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
                  <StatsCard
                    type="subscribe"
                    packageId={customer_package?.id}
                    value={
                      customer_package
                        ? `${customer_package.name} - ${moneyFormat(
                            customer_package.price
                          )}`
                        : "Não possui pacote"
                    }
                  />
                  <StatsCard type="deposits" value={moneyFormat(deposits)} />
                  <StatsCard
                    type="withdrawals"
                    value={moneyFormat(withdraws)}
                  />
                  <StatsCard type="balance" value={moneyFormat(balance)} />
                </SimpleGrid>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </Paper>
    </AdminLayout>
  );
}
