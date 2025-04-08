import { Head, usePage } from "@inertiajs/react";
import { Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Package } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import PackageCard from "@/Components/Packages/PackageCard";

export default function Index() {
  const { packages } = usePage<{ packages: Package[] }>().props;

  return (
    <AdminLayout>
      <Head title="Listar Pacotes" />

      <Paper>
        <Stack>
          <div>
            <Title order={2}>Pacotes</Title>
            <Text>Gerencie os pacotes cadastrados na plataforma..</Text>
          </div>

          <SimpleGrid
            cols={{ base: 2, md: 2, lg: 5 }}
            spacing={{ base: 10, sm: "sm" }}
            verticalSpacing={{ base: "sm" }}
          >
            {packages.map((pack, index) => (
              <PackageCard key={pack.id} pack={pack} index={index} />
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>
    </AdminLayout>
  );
}
