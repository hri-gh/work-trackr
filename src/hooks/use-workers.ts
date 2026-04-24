import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import type { Worker } from "@/generated/prisma/client";


// hook to fetch all workers
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
