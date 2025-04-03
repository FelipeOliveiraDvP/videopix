import { CustomPageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export function usePageProps() {
  return usePage().props as unknown as CustomPageProps;
}
