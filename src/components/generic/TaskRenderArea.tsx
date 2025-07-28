"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TaskFormValues } from "@/utils/validation-types";
import type { UseFormReturn } from "react-hook-form";

const TaskRenderArea = ({
  form,
  isEdit = false,
}: {
  form: UseFormReturn<TaskFormValues>;
  isEdit?: boolean;
}) => {
  return (
    <div className="space-y-3">
      {/* name  */}
      <FormField
        control={form.control}
        name="title"
        // disabled={isEdit}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={"Task Title"}
                {...field}
                className={`w-full `}
                // ${
                //   // isEdit ? "bg-gray-100 cursor-not-allowed" : ""
                // }
                // tabIndex={isEdit ? -1 : 0}
                // readOnly={isEdit}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* region  */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={"Description"}
                {...field}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TaskRenderArea;
