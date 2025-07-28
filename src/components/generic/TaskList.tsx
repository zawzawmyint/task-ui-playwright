import React from "react";
import TaskCard from "./TaskCard";
import type { Task } from "@/endpoints/taskEndPoints";

const TaskList = ({
  tasks,
  fetchTasks,
}: {
  tasks: Task[];
  fetchTasks: () => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
