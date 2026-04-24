import { z } from "zod";

export const CreateWorkerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(10, "Mobile must be at least 10 digits").max(10, "Mobile must be at most 10 digits").regex(/^[0-9]+$/, "Mobile must be a number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
});

export const UpdateWorkerSchema = CreateWorkerSchema.partial();

export type CreateWorkerInput = z.infer<typeof CreateWorkerSchema>;
export type UpdateWorkerInput = z.infer<typeof UpdateWorkerSchema>;
