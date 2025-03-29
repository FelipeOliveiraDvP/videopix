import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";

export default function Providers({ children }: { children: ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>;
}
