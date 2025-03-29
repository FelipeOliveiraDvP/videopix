import { FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Stack,
  Anchor,
} from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false as boolean,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AuthLayout>
      <Head title="Login" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <Paper w={300}>
        <form onSubmit={submit}>
          <Stack>
            <TextInput
              label="E-mail"
              placeholder="exemplo@email.com"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              error={errors.email}
            />
            <PasswordInput
              label="Senha"
              placeholder="********"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              error={errors.password}
            />
            <Checkbox
              label="Lembrar de mim"
              checked={data.remember}
              onChange={(e) =>
                setData("remember", (e.target.checked || false) as false)
              }
            />
            <Button variant="filled" type="submit" loading={processing}>
              Login
            </Button>
            <Anchor component={Link} href={route("password.request")}>
              Esqueci minha senha
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
