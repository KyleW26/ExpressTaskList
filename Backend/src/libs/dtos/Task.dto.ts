import { Task } from "@prisma/client";

export class TaskDTO implements Task {
  id!: string;
  title!: string;
  author!: string;
}
