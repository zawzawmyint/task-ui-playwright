import React, { useState } from "react";
import { LoginDialog } from "../generic/LoginDialog";
import Login from "../generic/Login";
import { Button } from "../ui/button";

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  return (
    <div className="top-0 left-0 right-0 sticky z-50 bg-secondary shadow-sm">
      <div className="flex justify-between items-center p-3 max-w-7xl mx-auto">
        <h1 className="text-primary font-bold text-xl">Task management</h1>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <p className="text-primary">Welcome, User</p>
              <Button onClick={logout} variant={"destructive"}>
                Logout
              </Button>
            </div>
          ) : (
            <LoginDialog setIsOpenDialog={setOpen} isOpenDialog={open}>
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setIsOpenDialog={setOpen}
              />
            </LoginDialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
