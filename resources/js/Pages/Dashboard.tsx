import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
  return (
    <AdminLayout>
      <Head title="Dashboard" />

      <div>You're logged in!</div>
    </AdminLayout>
  );
}
