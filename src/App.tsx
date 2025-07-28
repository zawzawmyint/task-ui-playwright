// import "./App.css";
import { useEffect, useState } from "react";
import { AddEditDialog } from "./components/generic/AddEditDialog";
import TaskAdd from "./components/generic/AddTask";
import TaskList from "./components/generic/TaskList";
import Header from "./components/global/Header";
import { LoginDialog } from "./components/generic/LoginDialog";
import Login from "./components/generic/Login";
import { listTasks, type Task } from "./endpoints/taskEndPoints";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await listTasks(token);
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="">
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="container p-6 max-w-7xl mx-auto">
        {isAuthenticated ? (
          <div>
            <div className="flex justify-between items-center">
              <h2>Task list</h2>
              <div>
                <AddEditDialog setIsOpenDialog={setOpen} isOpenDialog={open}>
                  <TaskAdd fetchTasks={fetchTasks} setIsOpenDialog={setOpen} />
                </AddEditDialog>
              </div>
            </div>
            <div>
              <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[80vh] gap-2">
            <p>Please login to continue</p>
            <LoginDialog setIsOpenDialog={setOpen} isOpenDialog={open}>
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setIsOpenDialog={setOpen}
              />
            </LoginDialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
