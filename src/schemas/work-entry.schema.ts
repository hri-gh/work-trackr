import { z } from "zod";

/* ---------- Create single ---------- */
// export const CreateWorkEntrySchema = z.object({
//     workerId: z.string().uuid(),
//     date: z.coerce.date(),
//     amount: z.number().int().min(0),
//     riceKg: z.number().positive(),
//     note: z.string().optional(),
// });


/* ---------- Bulk create ---------- */

export const CreateWorkEntrySchema = z.object({
  workerIds: z.array(z.string()).min(1, "Select at least one worker"),
  date: z.iso.date("Date is required"),
  amount: z.coerce.number().min(0, "Amount must be 0 or more"),
  grainKg: z.coerce.number().min(0, "Rice must be 0 kg or more"),
  note: z.string().optional(),
});

export type CreateWorkEntryInput = z.infer<typeof CreateWorkEntrySchema>;



/* ---------- Update (paid only) ---------- */
export const UpdateWorkEntrySchema = z.object({
  paid: z.boolean(),
  paymentDate: z.iso.date().optional(),
});

/* ---------- Bulk mark paid ---------- */
// export const MarkWorkEntriesPaidSchema = z.object({
//   entryIds: z.array(z.string().uuid()).min(1),
// });

export const MarkPaidSchema = z.object({
  entryIds: z.array(z.uuid()).min(1, "Select at least one entry"),
  paymentDate: z.iso.date().optional(),
});

export type MarkPaidInput = z.infer<typeof MarkPaidSchema>;
