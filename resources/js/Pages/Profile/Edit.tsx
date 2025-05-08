import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Container, Stack } from "@mantine/core";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { usePageProps } from "@/hooks/usePageProps";

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  const { auth } = usePageProps();
  const Layout = auth.user.role === "admin" ? AdminLayout : CustomerLayout;

  return (
    <Layout>
      <Head title="Minha Conta" />

      <Container size="sm" p={0}>
        <Stack>
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
          />
          <UpdatePasswordForm />
          <DeleteUserForm />
        </Stack>
      </Container>
    </Layout>
  );
}
