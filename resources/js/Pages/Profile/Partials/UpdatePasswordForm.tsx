import { useForm } from "@inertiajs/react";
import {
  Alert,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FormEventHandler, useRef } from "react";

export default function UpdatePasswordForm({
  className = "",
}: {
  className?: string;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <Paper>
      <Stack>
        <Stack>
          <Title order={2}>Alterar Senha</Title>
          <Text>
            Certifique-se de que sua conta esteja usando uma senha longa e
            aleatória para permanecer segura.
          </Text>
        </Stack>

        <form onSubmit={updatePassword}>
          <Stack>
            <PasswordInput
              label="Senha Atual"
              placeholder="********"
              value={data.current_password}
              onChange={(e) => setData("current_password", e.target.value)}
              error={errors.current_password}
              ref={currentPasswordInput}
            />
            <PasswordInput
              label="Nova Senha"
              placeholder="********"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              error={errors.password}
              ref={passwordInput}
            />
            <PasswordInput
              label="Confirmar Senha"
              placeholder="********"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              error={errors.password_confirmation}
            />
            <Button type="submit" maw={200}>
              Salvar
            </Button>
          </Stack>
        </form>
        {recentlySuccessful && (
          <Alert title="Sucesso!" color="green" variant="outline" radius="md">
            Salvo
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
