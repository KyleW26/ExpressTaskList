import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
});

export type TaskType = z.infer<typeof TaskSchema>;
