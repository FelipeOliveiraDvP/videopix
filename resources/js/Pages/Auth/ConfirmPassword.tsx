import AuthLayout from "@/Layouts/AuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Paper, PasswordInput, Stack } from "@mantine/core";
import { FormEventHandler } from "react";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.confirm"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AuthLayout>
      <Head title="Confirm Password" />

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

            <Button variant="filled" type="submit" loading={processing}>
              Confirmar
            </Button>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
