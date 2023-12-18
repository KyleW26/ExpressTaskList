import { BooleanResponseDTO, TaskDTO } from "@/libs/dtos";
import { TaskRepository } from "../repository/Task.repository";

export class TaskService {
  private readonly _taskRepository: TaskRepository = new TaskRepository();
  constructor() {}

  /**
   * @description Get task list
   * @param args
   * @returns
   */
  async getTasks(): Promise<TaskDTO[]> {
    return this._taskRepository.getAll();
  }

  /**
   * @description Create a new task
   * @param args
   * @returns
   */
  async createTask(args: TaskDTO): Promise<TaskDTO> {
    return this._taskRepository.create(args);
  }

  /**
   * @description Update an existing task
   * @param args
   * @returns
   */
  async updateTask(id: string, args: Partial<TaskDTO>): Promise<TaskDTO> {
    return this._taskRepository.update({ id, ...args });
  }

  /**
   * @description Delete an existing task
   * @param args
   * @returns
   */
  async deleteTask(id: string): Promise<BooleanResponseDTO> {
    const success = await this._taskRepository.delete(id);

    return {
      success,
      message: success
        ? "Task has been successfully deleted"
        : "Task has not been deleted, please try again",
    };
  }
}
