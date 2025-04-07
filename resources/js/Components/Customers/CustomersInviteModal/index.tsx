import { useForm } from "@inertiajs/react";
import {
  Button,
  Group,
  Modal,
  Portal,
  Stack,
  TagsInput,
  Text,
} from "@mantine/core";
import { FormEventHandler } from "react";

function CustomersInviteModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const { data, errors, setData, post, processing, reset } = useForm({
    emails: [] as string[],
  });

  const allEmailErrors = Object.entries(errors)
    .filter(([key]) => key.startsWith("emails."))
    .map(([, value]) => value);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("admin.customers.invite"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onClose();
      },
      onError: () => {
        console.log("errors", errors);
      },
    });
  };

  return (
    <Portal>
      <Modal
        opened={opened}
        onClose={onClose}
        title={<Text fw="bold">Convidar clientes</Text>}
        centered
        size="lg"
      >
        <form onSubmit={submit}>
          <Stack>
            <Text>
              Mande convites para os clientes que você deseja convidar para
              acessar a plataforma.
            </Text>

            <TagsInput
              placeholder="Aperte enter para adicionar um e-mail na lista"
              data={data.emails}
              onChange={(value) => setData("emails", value)}
              error={errors.emails ?? allEmailErrors[0]}
            />

            <Text>
              Somente e-mails válidos vão receber o convite. Você pode adicionar
              quantos e-mails quiser, separando-os por vírgula.
            </Text>

            <Group gap="sm" justify="flex-end">
              <Button variant="subtle" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="filled" type="submit" loading={processing}>
                Enviar convites
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Portal>
  );
}

export default CustomersInviteModal;
