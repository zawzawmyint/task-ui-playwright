import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddEditDialog } from "./AddEditDialog";
import TaskEdit from "./TaskEdit";
import type { Task } from "@/endpoints/taskEndPoints";
import TaskActions from "./TaskActions";

const TaskCard = ({
  task,
  fetchTasks,
}: {
  task: Task;
  fetchTasks: () => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardAction>
          <AddEditDialog isEdit setIsOpenDialog={setOpen} isOpenDialog={open}>
            <TaskEdit
              setIsOpenDialog={setOpen}
              task={task}
              fetchTasks={fetchTasks}
            />
          </AddEditDialog>
        </CardAction>
      </CardHeader>
      <CardContent className="flex justify-between items-center gap-4">
        <CardDescription>{task.description}</CardDescription>
        <TaskActions task={task} fetchTasks={fetchTasks} />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
