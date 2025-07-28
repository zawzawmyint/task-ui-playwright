import axios from "axios";

type TaskData = {
  title: string;
  description: string;
};
type UPdateTaskData = {
  title?: string;
  description?: string;
};

type TaskResponse = {
  success: boolean;
  data: Task;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

type DeleteTaskResponse = {
  success: boolean;
};

type TaskListResponse = {
  success: boolean;
  data: Task[];
  total?: number;
};

export async function listTasks(token: string): Promise<TaskListResponse> {
  const url = `${import.meta.env.VITE_API_URL}/tasks`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data.data,
      total: response.data.total,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized: Invalid or expired token");
      } else {
        throw new Error(
          `Failed to fetch tasks: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
      throw new Error("An unexpected error occurred while fetching tasks");
    }
  }
}

export async function createTask(
  taskData: TaskData,
  token: string
): Promise<TaskResponse> {
  try {
    const payload = {
      title: taskData.title,
      description: taskData.description,
    };

    const url = `${import.meta.env.VITE_API_URL}/tasks`;
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Task creation failed: ${
          error.response?.data?.message || error.message
        }`
      );
    } else {
      throw new Error("An unexpected error occurred while creating task");
    }
  }
}
export async function updateTask(
  taskData: UPdateTaskData,
  taskId: string,
  token: string
): Promise<TaskResponse> {
  try {
    const payload = {
      title: taskData.title,
      description: taskData.description,
    };

    const url = `${import.meta.env.VITE_API_URL}/tasks/${taskId}`;
    const response = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Task update failed: ${error.response?.data?.message || error.message}`
      );
    } else {
      throw new Error("An unexpected error occurred while creating task");
    }
  }
}

export async function deleteTask(
  taskId: string,
  token: string
): Promise<DeleteTaskResponse> {
  const url = `${import.meta.env.VITE_API_URL}/tasks/${taskId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized: Invalid or expired token");
      } else if (error.response?.status === 404) {
        throw new Error("Task not found");
      } else {
        throw new Error(
          `Failed to delete task: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
      throw new Error("An unexpected error occurred while deleting task");
    }
  }
}
