import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { LoginFormValues } from "@/utils/validation-types";

import type { UseFormReturn } from "react-hook-form";

const LoginRenderArea = ({
  form,
}: {
  form: UseFormReturn<LoginFormValues>;
}) => {
  return (
    <div className="space-y-3">
      {/* name 
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"User Name"} {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      {/* email  */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"Email..."} {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* passwrod  */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={"Password..."}
                {...field}
                className="w-full"
                type="password"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LoginRenderArea;
