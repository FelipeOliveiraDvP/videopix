import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Home({ users_count }: { users_count: number }) {
  const { auth } = usePage().props;
  return (
    <CustomerLayout>
      <Head title="Home" />

      <div>Todos os vídeos</div>
      <div>Total de usuários: {users_count}</div>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </CustomerLayout>
  );
}
