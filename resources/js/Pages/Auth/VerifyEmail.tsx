import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Alert, Anchor, Button, Text } from "@mantine/core";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <AuthLayout>
      <Head title="Verificação de e-mail" />

      <Text>
        Obrigado por se cadastrar! Antes de começar, você pode verificar seu
        endereço de e-mail clicando no link que acabamos de enviar para você? Se
        você não recebeu o e-mail, podemos enviar outro.
      </Text>

      {status === "verification-link-sent" && (
        <Alert
          variant="light"
          color="green"
          title="Link de verificação enviado"
        >
          Um novo link de verificação foi enviado para o endereço de e-mail
          fornecido durante o cadastro.
        </Alert>
      )}

      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-between">
          <Button disabled={processing}>
            Enviar outro e-mail de verificação
          </Button>

          <Anchor
            component={Link}
            href={route("logout")}
            method="post"
            as="button"
          >
            Sair
          </Anchor>
        </div>
      </form>
    </AuthLayout>
  );
}
