import { z } from "zod";

export const CreateWorkerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
});

export const UpdateWorkerSchema = CreateWorkerSchema.partial();

export type CreateWorkerInput = z.infer<typeof CreateWorkerSchema>;
export type UpdateWorkerInput = z.infer<typeof UpdateWorkerSchema>;
