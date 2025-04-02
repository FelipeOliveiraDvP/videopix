import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";

export default function Home() {
  return (
    <CustomerLayout>
      <Head title="Home" />

      <div>Todos os vídeos</div>
    </CustomerLayout>
  );
}
