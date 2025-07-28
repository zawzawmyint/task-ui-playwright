import { Form } from "@/components/ui/form";
import { createLoginFormValidationSchema } from "@/utils/validation-schema";

import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoginRenderArea from "./LoginRenderArea";
import DialogBtnWrapper from "./DialogButtonWrapper";
import DialogCancelButton from "./DialogCancelButton";
import SubmitButton from "./SubmitButton";
import { loginUser } from "@/endpoints/authEndPoints";

const Login = ({
  setIsOpenDialog,
  setIsAuthenticated,
}: {
  setIsOpenDialog: (val: boolean) => void;
  setIsAuthenticated: (val: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const LoginFormValidationSchema = createLoginFormValidationSchema();
  const form = useForm<z.infer<typeof LoginFormValidationSchema>>({
    resolver: zodResolver(LoginFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      email: "zack@gmail.com",
      password: "12345678",
    },
  });

  // Solution 1: Generate ID in the component
  const onLoginSubmit = async (
    data: z.infer<typeof LoginFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { email, password } = data;

      console.log(email, password);
      try {
        const response = await loginUser({ email, password });

        localStorage.setItem("token", response.token);
        toast.success("Success", {
          description: "Login successfully",
        });
        setIsOpenDialog?.(false);
        setIsAuthenticated?.(true);
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Failed to login please try again later",
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)}>
          {/* login render area  */}
          <LoginRenderArea form={form} />
          <DialogBtnWrapper>
            <DialogCancelButton />
            <SubmitButton isPending={isPending} />
          </DialogBtnWrapper>
        </form>
      </Form>
    </div>
  );
};

export default Login;
