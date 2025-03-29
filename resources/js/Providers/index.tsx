import { ReactNode } from "react";
import { createTheme, MantineProvider, Paper } from "@mantine/core";

const theme = createTheme({
  components: {
    Paper: Paper.extend({
      defaultProps: {
        withBorder: true,
        radius: 8,
        p: "md",
      },
    }),
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  );
}
