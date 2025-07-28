import { Form } from "@/components/ui/form";
import { createTaskFormValidationSchema } from "@/utils/validation-schema";
// import { createLibraryFormValidationSchema } from "@/utils/validation-schema/library/LibraryFormValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";

import { toast } from "sonner";
import { z } from "zod";
import TaskRenderArea from "./TaskRenderArea";
import DialogBtnWrapper from "./DialogButtonWrapper";
import DialogCancelButton from "./DialogCancelButton";
import SubmitButton from "./SubmitButton";
import { updateTask, type Task } from "@/endpoints/taskEndPoints";

// import LibraryRenderArea from "../library-render-area/LibraryRenderArea";
const TaskEdit = ({
  setIsOpenDialog,
  task,
  fetchTasks,
}: //   team,
{
  setIsOpenDialog?: (val: boolean) => void;
  task: Task;
  fetchTasks: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const TaskFormValidationSchema = createTaskFormValidationSchema();
  const form = useForm<z.infer<typeof TaskFormValidationSchema>>({
    resolver: zodResolver(TaskFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const onTeamEditSubmit = async (
    data: z.infer<typeof TaskFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { title, description } = data;
      const taskId = task.id;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await updateTask(
          { title, description },
          taskId,
          token
        );
        if (!response.success) {
          throw new Error("Failed to update task");
        }
        toast.success("Success", {
          description: "Task updated successfully",
        });
        setIsOpenDialog?.(false);
        fetchTasks();
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Failed to update task",
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onTeamEditSubmit)}>
          {/* tema render area  */}
          <TaskRenderArea form={form} isEdit />
          <DialogBtnWrapper>
            <DialogCancelButton />
            <SubmitButton isPending={isPending} />
          </DialogBtnWrapper>
        </form>
      </Form>
    </div>
  );
};

export default TaskEdit;
