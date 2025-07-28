"use client";

import { Form } from "@/components/ui/form";
import { createTaskFormValidationSchema } from "@/utils/validation-schema";

import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { toast } from "sonner";
import { z } from "zod";
import TaskRenderArea from "./TaskRenderArea";
import DialogBtnWrapper from "./DialogButtonWrapper";
import DialogCancelButton from "./DialogCancelButton";
import SubmitButton from "./SubmitButton";
import { createTask } from "@/endpoints/taskEndPoints";
// import TaskRenderArea from "../Task-render-area/TaskRenderArea";
// import LibraryRenderArea from "../library-render-area/LibraryRenderArea";
const TaskAdd = ({
  setIsOpenDialog,
  fetchTasks,
}: {
  setIsOpenDialog?: (val: boolean) => void;
  fetchTasks: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const TaskFormValidationSchema = createTaskFormValidationSchema();
  const form = useForm<z.infer<typeof TaskFormValidationSchema>>({
    resolver: zodResolver(TaskFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Solution 1: Generate ID in the component
  const onTaskAddSubmit = async (
    data: z.infer<typeof TaskFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { title, description } = data;
      const token = localStorage.getItem("token");
      try {
        if (!token) {
          throw new Error("No token found");
        }
        const response = await createTask({ title, description }, token);

        if (!response.success) {
          throw new Error("Failed to add task");
        }
        toast.success("Success", {
          description: "Task added successfully",
        });
        setIsOpenDialog?.(false);
        fetchTasks();
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Failed to add task",
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onTaskAddSubmit)}>
          {/* task render area  */}
          <TaskRenderArea form={form} />
          <DialogBtnWrapper>
            <DialogCancelButton />
            <SubmitButton isPending={isPending} />
          </DialogBtnWrapper>
        </form>
      </Form>
    </div>
  );
};

export default TaskAdd;
