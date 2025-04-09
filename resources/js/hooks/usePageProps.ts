import { CustomPageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export function usePageProps<T extends {}>() {
  return usePage().props as unknown as CustomPageProps & T;
}
