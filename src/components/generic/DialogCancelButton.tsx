"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

const DialogCancelButton = () => {
  return (
    <DialogClose asChild>
      <Button variant={"secondary"}>Cancel</Button>
    </DialogClose>
  );
};

export default DialogCancelButton;
