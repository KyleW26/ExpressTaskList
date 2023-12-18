import { PrismaClient, Task } from "@prisma/client";
import { TaskDTO } from "@/libs/dtos";

export class TaskRepository {
  protected _prismaClient: PrismaClient = new PrismaClient();

  /**
   * @description Fetch a list of tasks
   * @returns Promise<Task[]>
   */
  async getAll(): Promise<Task[]> {
    return this._prismaClient.task.findMany({});
  }

  /**
   * @description Create a new task
   * @param args
   * @returns Promise<Task>
   */
  async create(args: TaskDTO) {
    const { ...rest } = args;
    return this._prismaClient.$transaction(async (trx) => {
      const task = await trx.task.create({
        data: {
          ...rest,
        },
      });

      return task;
    });
  }

  /**
   * @description Update an existing task
   * @param args
   * @returns Promise<Task>
   */
  async update(args: Partial<Task>): Promise<Task> {
    const { id, ...rest } = args;
    return this._prismaClient.$transaction(async (trx) => {
      // If it does exist then update
      return trx.task.update({
        where: {
          id,
        },
        data: {
          ...rest,
        },
      });
    });
  }

  /**
   * @description Delete a task
   * @param args
   * @returns Promise<Task>
   */
  async delete(id: string): Promise<boolean> {
    return this._prismaClient.$transaction(async (trx) => {
      // Fetch the task from the database and delete if it exists, otherwise let it naturally error out
      await trx.task.delete({
        where: {
          id,
        },
      });

      return true;
    });
  }
}
