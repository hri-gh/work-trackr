import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { Worker } from "@/generated/prisma/client";

export function useWorkers() {
  const { data, error, isLoading, mutate } = useSWR<Worker[]>(
    "/workers",
    fetcher
  );

  return {
    workers: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}
