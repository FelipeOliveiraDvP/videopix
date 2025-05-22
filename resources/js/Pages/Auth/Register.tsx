import { Head, Link, useForm } from "@inertiajs/react";
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Group,
  InputBase,
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
import { IconCircleX, IconCircleCheck } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";

export default function Register() {
  const [active, setActive] = useState(0);
  const matches = useMediaQuery("(min-width: 75em)");
  const params = new URLSearchParams(window.location.search);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: params.get("email") || "",
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
            <Logo variant="white" width={64} />
            <Title order={2} size={18}>
              Bem vindo ao Video PIX
            </Title>
            <Text ta="center" size="sm">
              Crie sua conta para começar a receber dinheiro assistindo vídeos.
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
                  <InputBase
                    label="CPF"
                    placeholder="000.000.000-00"
                    component={IMaskInput}
                    mask="000.000.000-00"
                    value={data.cpf}
                    onChange={(e) => {
                      setData("cpf", e.currentTarget.value);
                      setData("pix", e.currentTarget.value);
                    }}
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
                    readOnly
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
                    label="Chave PIX (CPF)"
                    description="Essa chave será usada para receber pagamentos"
                    placeholder="Informe a chave onde você quer receber o pagamento"
                    value={data.cpf}
                    onChange={(e) => setData("pix", e.target.value)}
                    error={errors.pix}
                    readOnly
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
                    error={errors.accept_terms}
                  />
                </Stack>
              </Stepper.Step>
              <Stepper.Completed>
                <Center>
                  <Stack align="center" gap="sm">
                    <Text size="lg" fw={500} c="primary">
                      Você está quase lá!
                    </Text>
                    <Text size="sm" c="dimmed" ta="center">
                      Clique no botão abaixo para criar sua conta e acessar a
                      plataforma.
                    </Text>
                    <Button
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "orange", to: "yellow", deg: 219 }}
                      type="submit"
                      loading={processing}
                    >
                      Criar conta
                    </Button>
                  </Stack>
                </Center>
              </Stepper.Completed>
            </Stepper>
            <Group justify="center" mt="xl">
              <Button
                variant="subtle"
                onClick={prevStep}
                type="button"
                disabled={active === 0 || processing}
              >
                Voltar
              </Button>
              <Button
                onClick={nextStep}
                type="button"
                disabled={active === 3 || processing}
              >
                Próximo passo
              </Button>
            </Group>
          </form>
        </Paper>
      </Center>
    </Providers>
  );
}
