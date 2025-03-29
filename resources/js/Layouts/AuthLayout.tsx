import { PropsWithChildren } from "react";
import { Center, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Providers from "@/Providers";

export default function AuthLayout({ children }: PropsWithChildren) {
  const matches = useMediaQuery("(min-width: 75em)");

  return (
    <Providers>
      <Grid
        gutter={0}
        styles={{
          root: {
            height: "100%",
          },
          inner: {
            height: "100%",
          },
          col: {
            height: "100%",
            padding: 0,
            margin: 0,
          },
        }}
      >
        {matches && (
          <Grid.Col span={{ base: 12, lg: 6 }} bg="indigo">
            <Center h="100%">
              <Text fw={700} size="xl">
                LOGO
              </Text>
            </Center>
          </Grid.Col>
        )}

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Center h="100%">{children}</Center>
        </Grid.Col>
      </Grid>
    </Providers>
  );
}
