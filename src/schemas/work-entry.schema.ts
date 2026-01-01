import { z } from "zod";

/* ---------- Create single ---------- */
export const CreateWorkEntrySchema = z.object({
    workerId: z.string().uuid(),
    date: z.coerce.date(),
    amount: z.number().int().min(0),
    riceKg: z.number().positive(),
    note: z.string().optional(),
});


/* ---------- Bulk create ---------- */
export const CreateBulkWorkEntrySchema = z.object({
  date: z.coerce.date(),
  amount: z.number().int().min(0),
  riceKg: z.number().positive(),
  note: z.string().optional(),
  workerIds: z.array(z.string().uuid()).min(1),
});


/* ---------- Update (paid only) ---------- */
export const UpdateWorkEntrySchema = z.object({
  paid: z.boolean(),
});

/* ---------- Bulk mark paid ---------- */
export const MarkWorkEntriesPaidSchema = z.object({
  entryIds: z.array(z.string().uuid()).min(1),
});
