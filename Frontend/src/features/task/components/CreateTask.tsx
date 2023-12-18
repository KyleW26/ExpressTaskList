import { useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  FormLabel,
  Input,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { TaskType } from "../domain/Task.schema";
import useTask from "../hooks/useTask";

export default function CreateTask() {
  const initialTaskValues: TaskType = {
    id: "",
    title: "",
    author: "",
  };
  const { createTask, loading } = useTask();
  const [task, setTask] = useState<TaskType>(initialTaskValues);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSave = async () => {
    await createTask(task);
  };

  const onClose = () => {
    setIsOpen(false);
    setTask(initialTaskValues);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create New Task</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bg={"white"} opacity={0}>
          <ModalHeader bg={"gray.200"}>New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                required
                autoFocus
                name="title"
                variant={"outline"}
                value={task.title}
                onChange={(value) => {
                  setTask({ ...task, title: value.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                required
                autoFocus
                name="author"
                variant={"outline"}
                value={task.author}
                onChange={(value) => {
                  setTask({ ...task, author: value.target.value });
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter bg={"gray.100"} mt={4}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onSave}
              isLoading={loading}
              disabled={loading}
            >
              Save
            </Button>
            <Button onClick={() => onClose()} disabled={loading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
