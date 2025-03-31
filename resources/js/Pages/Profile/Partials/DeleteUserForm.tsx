import { useForm } from "@inertiajs/react";
import {
  Button,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Portal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({
  className = "",
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    clearErrors();
    reset();
  };

  return (
    <>
      <Paper>
        <Stack>
          <Stack>
            <Title order={2}>Deletar conta</Title>
            <Text>
              Uma vez que sua conta for excluída, todos as suas informações
              serão excluídos permanentemente. Por favor, informe sua senha para
              confirmar que você deseja excluir sua conta permanentemente.
            </Text>
          </Stack>
          <Button
            variant="filled"
            color="red"
            onClick={confirmUserDeletion}
            loading={processing}
            maw={200}
          >
            Deletar conta
          </Button>
        </Stack>
      </Paper>
      <Portal>
        <Modal
          opened={confirmingUserDeletion}
          onClose={closeModal}
          title="Excluir minha conta"
          centered
          size="lg"
        >
          <form onSubmit={deleteUser}>
            <Stack>
              <Title order={2}>
                Você tem certeza que deseja excluir sua conta?
              </Title>
              <Text>
                Uma vez que sua conta for excluída, todos as suas informações
                serão excluídos permanentemente. Por favor, informe sua senha
                para confirmar que você deseja excluir sua conta
                permanentemente.
              </Text>

              <PasswordInput
                placeholder="Informe sua senha"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                error={errors.password}
              />

              <Group gap="sm">
                <Button variant="subtle" color="red" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  type="submit"
                  loading={processing}
                >
                  Deletar conta
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </Portal>
    </>
  );
}
