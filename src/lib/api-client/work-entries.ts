import { api } from "@/lib/api/client";
import type { CreateWorkEntryInput } from "@/schemas/work-entry.schema";

export const createWorkEntry = (data: CreateWorkEntryInput) => {
  return api.post("/work-entries", data);
};

export const updatePaidStatus = (entryIds: string[]) => {
  return api.patch("/work-entries/mark-paid", { entryIds });
}
