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
import { usePageProps } from "@/hooks/usePageProps";
import { Dashboard as DashboardProps } from "@/types";

export default function Dashboard() {
  const {
    totalDeposits,
    totalWithdrawals,
    totalVideosWatched,
    depositLast6Months,
    withdrawalsLast6Months,
    balanceLast12Months,
    depositsByPackage,
    clientsByPackage,
    totalInvites,
    conversionRate,
  } = usePageProps<DashboardProps>();

  return (
    <AdminLayout>
      <Head title="Dashboard" />

      <Stack gap="lg">
        <SimpleGrid
          cols={{ base: 2, md: 2, lg: 5 }}
          spacing={{ base: 10, sm: "lg" }}
          verticalSpacing={{ base: "lg" }}
        >
          <StatsCard type="deposits" value={moneyFormat(totalDeposits)} />
          <StatsCard type="withdrawals" value={moneyFormat(totalWithdrawals)} />
          <StatsCard type="invites" value={String(totalInvites)} />
          <StatsCard
            type="conversion"
            value={`${Math.round(conversionRate)}%`}
          />
          <StatsCard type="views" value={`${totalVideosWatched}`} />
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
                    data={depositLast6Months}
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
                    data={withdrawalsLast6Months}
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
                  data={balanceLast12Months}
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
                    data={depositsByPackage.map((item, index) => ({
                      name: item.package,
                      value: item.total,
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
                    data={clientsByPackage.map((item, index) => ({
                      name: item.package,
                      value: item.total,
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
