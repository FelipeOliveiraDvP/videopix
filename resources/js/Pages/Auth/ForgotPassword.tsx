import { FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Alert,
  Anchor,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";
import Logo from "@/Components/Logo";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, reset, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"), {
      onSuccess: () => {
        reset("email");
      },
    });
  };

  return (
    <AuthLayout>
      <Head title="Esqueci minha senha" />

      <Stack>
        {status && (
          <Alert color="green" title="Sucesso!" mb="md">
            <Text c="green">
              Enviamos o link de redefinição de senha para o seu e-mail.
            </Text>
          </Alert>
        )}

        <Paper maw={400}>
          <Stack align="center" mb="md">
            <Logo variant="white" width={100} />
            <Title order={2}>Bem vindo ao Video PIX</Title>
            <Text ta={"center"}>
              Esqueceu sua senha? Não tem problema. Basta nos informar seu
              endereço de e-mail e nós lhe enviaremos um link de redefinição de
              senha para você escolher uma nova senha.
            </Text>
          </Stack>
          <form onSubmit={submit}>
            <Stack>
              <TextInput
                label="E-mail"
                placeholder="exemplo@email.com"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                error={errors.email}
              />

              <Button variant="filled" type="submit" loading={processing}>
                Recuperar senha
              </Button>
              <Anchor component={Link} href={route("login")} ta="center">
                Voltar para o login
              </Anchor>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </AuthLayout>
  );
}
