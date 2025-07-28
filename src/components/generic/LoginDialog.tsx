import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LoginDialog({
  children,
  isOpenDialog,
  setIsOpenDialog,
}: {
  children: React.ReactNode;
  isOpenDialog?: boolean;
  setIsOpenDialog?: (val: boolean) => void;
}) {
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size={"default"}>
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Please login to your account to continue
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
