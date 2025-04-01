import { PropsWithChildren } from "react";
import { BackgroundImage, Center, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Providers from "@/Providers";
import bgImage from "@/Assets/auth-bg.png";

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
          <Grid.Col span={{ base: 12, lg: 6 }} bg="black">
            <BackgroundImage src={bgImage} h="100%">
              <Center h="100%"></Center>
            </BackgroundImage>
          </Grid.Col>
        )}

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Center h="100%">{children}</Center>
        </Grid.Col>
      </Grid>
    </Providers>
  );
}
