import { PropsWithChildren } from "react";
import Providers from "@/Providers";

export default function Guest({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
