import { Head } from "@inertiajs/react";
import { AreaChart, DonutChart } from "@mantine/charts";
import { Card, Center, Grid, SimpleGrid, Stack, Title } from "@mantine/core";
import { moneyFormat } from "@/Utils/moneyFormat";
import {
  dummyAverageDeposits,
  dummyAverageWithdraws,
  dummyCustomersByPackage,
  dummyDepositsByPackage,
} from "@/dummy/dummyDashboard";
import AdminLayout from "@/Layouts/AdminLayout";
import StatsCard from "@/Components/StatsCard";
import { packageColors } from "@/constants";

export default function Dashboard() {
  return (
    <AdminLayout>
      <Head title="Dashboard" />

      <Stack gap="lg">
        <SimpleGrid
          cols={{ base: 2, md: 2, lg: 5 }}
          spacing={{ base: 10, sm: "lg" }}
          verticalSpacing={{ base: "lg" }}
        >
          <StatsCard type="deposits" value="R$ 112k" />
          <StatsCard type="withdrawals" value="R$ 86k" />
          <StatsCard type="invites" value="1257" />
          <StatsCard type="conversion" value="35%" />
          <StatsCard type="views" value="1.1mi" />
        </SimpleGrid>
        <Grid>
          <Grid.Col
            span={{ base: 12, md: 6, lg: 8 }}
            order={{ base: 2, lg: 1 }}
          >
            <Stack>
              <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="lg"
                verticalSpacing={{ base: "sm" }}
              >
                <Card>
                  <Title order={5} mb="sm">
                    Depósitos nos últimos 6 meses
                  </Title>
                  <AreaChart
                    h={300}
                    data={dummyAverageDeposits}
                    dataKey="date"
                    series={[{ name: "total", color: "green" }]}
                    curveType="natural"
                  />
                </Card>

                <Card>
                  <Title order={5} mb="sm">
                    Retiradas nos últimos 6 meses
                  </Title>
                  <AreaChart
                    h={300}
                    data={dummyAverageWithdraws}
                    dataKey="date"
                    series={[{ name: "total", color: "red" }]}
                    curveType="natural"
                  />
                </Card>
              </SimpleGrid>
              <Card>
                <Title order={5} mb="sm">
                  Saldo nos últimos 12 meses
                </Title>
                <AreaChart
                  h={300}
                  data={[...dummyAverageWithdraws, ...dummyAverageDeposits]}
                  dataKey="date"
                  series={[{ name: "total", color: "blue" }]}
                  curveType="natural"
                />
              </Card>
            </Stack>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 6, lg: 4 }}
            order={{ base: 1, lg: 2 }}
          >
            <Stack>
              <Card h={370}>
                <Center h="100%">
                  <DonutChart
                    size={250}
                    thickness={30}
                    data={dummyDepositsByPackage.map((item, index) => ({
                      ...item,
                      color: packageColors[index],
                    }))}
                    chartLabel="Depósitos por pacote"
                  />
                </Center>
              </Card>
              <Card h={370}>
                <Center h="100%">
                  <DonutChart
                    size={250}
                    thickness={30}
                    data={dummyCustomersByPackage.map((item, index) => ({
                      ...item,
                      color: packageColors[index],
                    }))}
                    chartLabel="Clientes por pacote"
                  />
                </Center>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </AdminLayout>
  );
}
