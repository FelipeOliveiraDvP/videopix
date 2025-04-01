import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Stepper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FormEventHandler, useState } from "react";
import dayjs from "dayjs";
import Logo from "@/Components/Logo";
import Providers from "@/Providers";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCircleX,
  IconCircleCheck,
  IconCircleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

export default function Register() {
  const [active, setActive] = useState(1);
  const matches = useMediaQuery("(min-width: 75em)");
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

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const hasErrors = () => {
    if (active === 1) {
      return !!(errors.name || errors.cpf || errors.birth_date);
    } else if (active === 2) {
      return !!(errors.email || errors.phone);
    } else if (active === 3) {
      return !!(
        errors.pix ||
        errors.password ||
        errors.password_confirmation ||
        errors.accept_terms
      );
    }
    return false;
  };

  const errorIcon = hasErrors() ? (
    <IconCircleX size={16} color="red" />
  ) : (
    <IconCircleCheck size={16} color="primary" />
  );

  const errorColor = hasErrors() ? "red" : "primary";

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <Providers>
      <Center h="100%">
        <Head title="Criar Conta" />

        <Paper withBorder={false}>
          <Stack align="center" mb="md">
            <Logo variant="white" width={50} />
            <Title order={2} size={18}>
              Bem vindo ao Video PIX
            </Title>
            <Text ta="center" size="sm">
              Crie sua conta para começar a receber dinheiro para assistir
              vídeos.
            </Text>
          </Stack>
          <form onSubmit={submit}>
            <Stepper
              active={active}
              onStepClick={setActive}
              size="sm"
              color="primary"
              orientation={matches ? "horizontal" : "vertical"}
            >
              <Stepper.Step
                label="Informações Pessoais"
                description="Nos diga o seu nome e quando você nasceu"
                color={errorColor}
                icon={errorIcon}
              >
                <Stack>
                  <TextInput
                    label="Nome"
                    placeholder="Seu nome completo"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                  />
                  <TextInput
                    label="CPF"
                    placeholder="000.000.000-00"
                    value={data.cpf}
                    onChange={(e) => setData("cpf", e.target.value)}
                    error={errors.cpf}
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
                </Stack>
              </Stepper.Step>
              <Stepper.Step
                label="Contato"
                description="Como podemos entrar em contato com você?"
                color={errorColor}
                icon={errorIcon}
              >
                <Stack>
                  <TextInput
                    label="E-mail"
                    placeholder="exemplo@email.com"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                  />
                  <TextInput
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    error={errors.phone}
                  />
                </Stack>
              </Stepper.Step>
              <Stepper.Step
                label="Finalizar Cadastro"
                description="Já está quase lá!"
                color={errorColor}
                icon={errorIcon}
              >
                <Stack>
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
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    error={errors.password_confirmation}
                  />
                  <Checkbox
                    label="Concordo com os termos de uso e a política de privacidade"
                    checked={data.accept_terms}
                    onChange={(e) =>
                      setData(
                        "accept_terms",
                        (e.target.checked || false) as false
                      )
                    }
                  />

                  {/* <Anchor component={Link} href={route("login")}>
                    Já tenho uma conta
                  </Anchor> */}
                </Stack>
              </Stepper.Step>
              <Stepper.Completed>
                <Center h={200}>
                  <Stack align="center" gap="sm">
                    <Text size="lg" fw={500} c="primary">
                      Você finalizou o cadastro!
                    </Text>
                    <Text size="sm" c="dimmed">
                      Você pode acessar sua conta agora mesmo.{" "}
                      <Anchor component={Link} href={route("login")}>
                        Clique aqui para ir para o login
                      </Anchor>
                    </Text>
                  </Stack>
                </Center>
              </Stepper.Completed>
            </Stepper>
            <Group justify="center" mt="xl">
              <Button variant="subtle" onClick={prevStep} type="button">
                Voltar
              </Button>
              {active < 3 ? (
                <Button onClick={nextStep} type="button" loading={processing}>
                  Próximo passo
                </Button>
              ) : (
                <Button variant="filled" type="submit" loading={processing}>
                  Criar conta
                </Button>
              )}
            </Group>
          </form>
        </Paper>
      </Center>
    </Providers>
  );
}
