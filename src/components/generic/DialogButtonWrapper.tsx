import { DialogFooter } from "@/components/ui/dialog";
import React from "react";

const DialogBtnWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <DialogFooter className="mt-4 flex justify-end gap-2">
      {children}
    </DialogFooter>
  );
};

export default DialogBtnWrapper;
