import { FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Anchor, Button, Paper, Stack, Text, TextInput } from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <AuthLayout>
      <Head title="Forgot Password" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <Paper maw={500} withBorder={false}>
        <form onSubmit={submit}>
          <Stack>
            <Text>
              Esqueceu sua senha? Não tem problema. Basta nos informar seu
              endereço de e-mail e nós lhe enviaremos um link de redefinição de
              senha para você escolher uma nova senha.
            </Text>
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
            <Anchor component={Link} href={route("login")}>
              Voltar para o login
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
