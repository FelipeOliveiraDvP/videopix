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
    accept_terms: false as boolean,
    adult: false as boolean,
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
            <Checkbox
              label="Ao fazer login, você concorda com nossos Termos de Serviço e Política de Privacidade."
              checked={data.accept_terms}
              onChange={(e) =>
                setData("accept_terms", (e.target.checked || false) as false)
              }
              error={errors.accept_terms}
            />
            <Checkbox
              label="Confirmo que possuo mais de 18 anos de idade."
              checked={data.adult}
              onChange={(e) =>
                setData("adult", (e.target.checked || false) as false)
              }
              error={errors.adult}
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
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
