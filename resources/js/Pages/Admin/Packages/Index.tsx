import PackageCard from "@/Components/Packages/PackageCard";
import { dummyPackages } from "@/dummy";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";

export default function Index() {
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
            {dummyPackages.map((pack, index) => (
              <PackageCard key={pack.id} pack={pack} index={index} />
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>
    </AdminLayout>
  );
}
