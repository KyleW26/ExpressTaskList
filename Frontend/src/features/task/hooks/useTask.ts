/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TaskSchema, TaskType } from "../domain/Task.schema";
import useTaskStore from "../useTaskStore";
import { useToast } from "@chakra-ui/react";
import { CreateTaskSchema, CreateTaskType } from "../domain/CreateTask.schema";

export default function useTask() {
  const [loading, setLoading] = useState(false);
  const [state, actions] = useTaskStore();
  const toast = useToast();

  /**
   * @description Get all tasks from the API
   * @param {number} limit
   * @param {number} page
   * @returns {Promise<Task[]>}
   */
  async function getTasks(): Promise<TaskType[]> {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/task/list`);
      const data = await response.json();

      // Validate using zod.
      const result = await TaskSchema.array().safeParseAsync(data);

      if (result.success === false) throw new Error(result.error?.message);

      actions.setTasks(result.data);

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("[useTask] getTasks error", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  /**
   * @description Create a new task
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  async function createTask(task: CreateTaskType): Promise<TaskType> {
    setLoading(true);

    try {
      // Validate using zod.
      const args = await CreateTaskSchema.safeParseAsync(task);
      if (args.success === false) throw new Error(args.error?.message);
      const response = await fetch(`http://localhost:3000/api/task/create`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(args.data),
      });
      const data = await response.json();

      // Validate using zod.
      const result = await TaskSchema.safeParseAsync(data);

      if (result.success === false) throw new Error(result.error?.message);

      await getTasks();

      return result.data;
    } catch (error: any) {
      console.error("[useTask] createTask error", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    getTasks,
    createTask,
    state,
  };
}
