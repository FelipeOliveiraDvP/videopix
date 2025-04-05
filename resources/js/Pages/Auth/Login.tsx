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
  Title,
  Text,
  Divider,
} from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";
import Logo from "@/Components/Logo";

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

      <Paper w={{ base: 320, md: 400 }}>
        <Stack align="center" mb="md">
          <Logo variant="white" width={64} />
          <Title order={2} ta="center">
            Bem vindo ao Video PIX
          </Title>
          <Text ta="center">
            Informe seu e-mail e senha para acessar a plataforma.
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
            <Anchor
              component={Link}
              href={route("password.request")}
              ta="center"
            >
              Esqueci minha senha
            </Anchor>
            <Divider label="Ou" />
            <Anchor component={Link} href={route("register")} ta="center">
              Criar Conta
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
