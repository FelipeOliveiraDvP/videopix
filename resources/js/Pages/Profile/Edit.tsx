import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Container, Stack } from "@mantine/core";

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AdminLayout>
      <Head title="Minha Conta" />

      <Container size="sm">
        <Stack>
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
          />
          <UpdatePasswordForm />
          <DeleteUserForm />
        </Stack>
      </Container>
    </AdminLayout>
  );
}
