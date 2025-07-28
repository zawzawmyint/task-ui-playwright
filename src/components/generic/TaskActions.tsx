"use client";
import { DeleteActionsAlert } from "@/components/generic/DeleteActionAlert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTask, type Task } from "@/endpoints/taskEndPoints";

import { MoreHorizontal } from "lucide-react";

import { useTransition } from "react";
import { toast } from "sonner";

const TaskActions = ({
  task,
  fetchTasks,
}: {
  task: Task;
  fetchTasks: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        await deleteTask(task.id, token);
        fetchTasks();
        console.log("Delete Task");
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Something went wrong.",
        });
      }
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="h-8 w-8 p-0">
          <p className="sr-only">Open menu</p>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive hover:text-destructive"
          asChild
        >
          <DeleteActionsAlert
            name={"Delete Task"}
            title={"Delete Task"}
            description={"Are you sure you want to delete this task?"}
            handleDelete={handleDelete}
            isPending={isPending}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskActions;
