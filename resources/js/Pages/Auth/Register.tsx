import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FormEventHandler } from "react";
import dayjs from "dayjs";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    birth_date: "",
    cpf: "",
    pix: "",
    password: "",
    password_confirmation: "",
    accept_terms: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AuthLayout>
      <Head title="Cadastro" />

      <Paper maw={500}>
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
            <TextInput
              label="CPF"
              placeholder="000.000.000-00"
              value={data.cpf}
              onChange={(e) => setData("cpf", e.target.value)}
              error={errors.cpf}
            />
            <TextInput
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
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
            <TextInput
              label="Chave PIX"
              placeholder="Informe a chave onde você quer receber o pagamento"
              value={data.pix}
              onChange={(e) => setData("pix", e.target.value)}
              error={errors.pix}
            />
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
            <Checkbox
              label="Concordo com os termos de uso e a política de privacidade"
              checked={data.accept_terms}
              onChange={(e) =>
                setData("accept_terms", (e.target.checked || false) as false)
              }
            />
            <Button variant="filled" type="submit" loading={processing}>
              Criar conta
            </Button>
            <Anchor component={Link} href={route("login")}>
              Já tenho uma conta
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
