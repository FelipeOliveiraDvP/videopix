import { ReactNode } from "react";
import {
  Anchor,
  Button,
  createTheme,
  MantineProvider,
  Paper,
} from "@mantine/core";

const theme = createTheme({
  primaryShade: 8,
  colors: {
    primary: [
      "#f6eeff",
      "#e6daf5",
      "#cab2e7",
      "#ad87db",
      "#9562d0",
      "#854bc9",
      "#7e40c7",
      "#6c32b0",
      "#602b9e",
      "#53248b",
    ],
  },
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        fw: "bold",
        c: "gray.0",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        color: "primary",
      },
    }),
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
