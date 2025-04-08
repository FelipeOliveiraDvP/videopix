import { Link, useForm, usePage } from "@inertiajs/react";
import {
  Alert,
  Anchor,
  Button,
  InputBase,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FormEventHandler } from "react";
import dayjs from "dayjs";
import { usePageProps } from "@/hooks/usePageProps";
import { IMaskInput } from "react-imask";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const {
    auth: { user },
  } = usePageProps();

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      cpf: user.customer?.cpf,
      phone: user.customer?.phone,
      birth_date: user.customer?.birth_date,
      pix: user.customer?.pix,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <Paper>
      <Stack>
        <Stack>
          <Title order={2}>Informações da conta</Title>
          <Text>
            Atualize as informações do perfil e o endereço de e-mail da sua
            conta.
          </Text>
        </Stack>

        <form onSubmit={submit}>
          <Stack>
            <TextInput
              label="Nome"
              placeholder="Seu nome completo"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              error={errors.name}
            />
            <TextInput
              label="E-mail"
              placeholder="exemplo@email.com"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
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
              label="Chave PIX"
              placeholder="Informe a chave onde você quer receber o pagamento"
              value={data.pix}
              onChange={(e) => setData("pix", e.target.value)}
              error={errors.pix}
            />

            {mustVerifyEmail && user.email_verified_at === null && (
              <>
                <Text c="gray">
                  Seu endereço de e-mail não está verificado.{" "}
                  <Anchor
                    component={Link}
                    href={route("verification.send")}
                    method="post"
                    as="button"
                  >
                    Clique aqui para reenviar o e-mail de verificação.
                  </Anchor>
                </Text>

                {status === "verification-link-sent" && (
                  <Text c="green" fw={500}>
                    Um novo link de verificação foi enviado para o endereço de
                    e-mail fornecido.
                  </Text>
                )}
              </>
            )}

            <Button
              variant="filled"
              type="submit"
              loading={processing}
              maw={200}
            >
              Salvar
            </Button>
          </Stack>
        </form>
        {recentlySuccessful && (
          <Alert title="Sucesso!" color="green" variant="outline" radius="md">
            Informações atualizadas com sucesso.
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
