import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Anchor, Button, Paper, PasswordInput, Stack } from "@mantine/core";
import { FormEventHandler } from "react";

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AuthLayout>
      <Head title="Alterar Senha" />

      <Paper w={300}>
        <form onSubmit={submit}>
          <Stack>
            <PasswordInput
              label="Senha"
              placeholder="********"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              error={errors.password}
            />
            <PasswordInput
              label="Confirmar Senha"
              placeholder="********"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              error={errors.password_confirmation}
            />
            <Button variant="filled" type="submit" loading={processing}>
              Alterar Senha
            </Button>
            <Anchor component={Link} href={route("login")}>
              Ir para o Login
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
