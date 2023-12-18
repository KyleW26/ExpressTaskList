import { Request, Response } from "express";
import { Controller } from "../../../libs/decorators";
import {
  Get,
  Post,
  Put,
  Delete,
} from "../../../libs/decorators/RequestMethod.decorator";
import { TaskService } from "../domain/Task.service";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { BooleanResponseDTO, TaskDTO } from "@/libs/dtos";

/**
 * @description Task controller - Handles all the task related routes
 */
@Controller("/task")
export class TaskController {
  private readonly _taskService: TaskService = new TaskService();

  /**
   * @description Get task list
   * @param args  - The arguments of the request.
   * @returns Promise<TaskResponseDTO[]>
   * @todo Validate args
   */
  @Get("/list")
  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._taskService.getTasks();

      res.json(result).status(200);
      return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("[TaskController] getTaskList error", error);
      if (
        error instanceof PrismaClientValidationError ||
        error instanceof PrismaClientUnknownRequestError ||
        error instanceof PrismaClientKnownRequestError
      ) {
        res
          .json({ error: "Sorry, something went wrong with that request." })
          .status(500);
        return;
      }

      res.json({ error: error?.message as string }).status(500);
      return;
    }
  }

  /**
   * @description Create a new task
   * @param args  - The arguments of the request.
   * @returns Promise<TaskDTO>
   * @todo Validate args
   */
  @Post("/create")
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const args: TaskDTO = req?.body;

      const result = await this._taskService.createTask(args);

      res.json(result).status(201);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("[TaskController] createTask error", error);
      if (
        error instanceof PrismaClientValidationError ||
        error instanceof PrismaClientUnknownRequestError ||
        error instanceof PrismaClientKnownRequestError
      ) {
        res
          .json({ error: "Sorry, something went wrong with that request." })
          .status(500);
        return;
      }

      res.json({ error: error?.message as string }).status(500);
      return;
    }
  }

  /**
   * @description Update an existing task
   * @param args  - The arguments of the request.
   * @returns Promise<TaskDTO>
   * @todo Validate args
   */
  @Put("/update/:id")
  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      // Stop the function here if there is no id provided
      if (!id) throw new Error("ID has not been provided");
      const args: Omit<TaskDTO, "id"> = req.body;

      const result = await this._taskService.updateTask(id, args);

      res.json(result).status(200);
    } catch (error: any) {
      console.error("[TaskController] updateTask error", error);
      if (
        error instanceof PrismaClientValidationError ||
        error instanceof PrismaClientUnknownRequestError ||
        error instanceof PrismaClientKnownRequestError
      ) {
        res.status(500).json({ error: "Sorry, unable to update your task." });
        return;
      }

      res.status(500).json({ error: error?.message as string });
      return;
    }
  }

  /**
   * @description Delete an existing task
   * @param args  - The arguments of the request.
   * @returns Promise<TaskDTO>
   * @todo Validate args
   */
  @Delete("/:id")
  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      // Stop the function here if there is no id provided
      if (!id) throw new Error("ID has not been provided");

      const result = await this._taskService.deleteTask(id);

      res.json(result).status(200);
    } catch (error: any) {
      console.error("[TaskController] deleteTask error", error);
      if (
        error instanceof PrismaClientValidationError ||
        error instanceof PrismaClientUnknownRequestError ||
        error instanceof PrismaClientKnownRequestError
      ) {
        res.status(500).json({ error: "Sorry, unable to update your task." });
        return;
      }

      res.status(500).json({ error: error?.message as string });
      return;
    }
  }
}
