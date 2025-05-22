import { PropsWithChildren } from "react";
import { Alert, Center, Container } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { usePageProps } from "@/hooks/usePageProps";
import Providers from "@/Providers";

export default function AuthLayout({ children }: PropsWithChildren) {
  const {
    flash: { error, success },
  } = usePageProps();

  return (
    <Providers>
      <Center h="100%">
        <Container w={{ base: "100%", md: 400 }} fluid>
          {error && (
            <Alert
              variant="light"
              color="red"
              withCloseButton
              title="Algum erro ocorreu"
              icon={<IconInfoCircle />}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              variant="light"
              color="green"
              withCloseButton
              title="Sucesso"
              icon={<IconInfoCircle />}
            >
              {success}
            </Alert>
          )}
          {children}
        </Container>
      </Center>
    </Providers>
  );
}
