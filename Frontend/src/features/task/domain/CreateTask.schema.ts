import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().max(255).min(3),
  author: z.string().optional(),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
