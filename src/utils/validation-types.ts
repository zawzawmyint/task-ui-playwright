import { z } from "zod";
import type {
  createLoginFormValidationSchema,
  createTaskFormValidationSchema,
} from "./validation-schema";

// library
export type TaskFormValues = z.infer<
  ReturnType<typeof createTaskFormValidationSchema>
>;

export type LoginFormValues = z.infer<
  ReturnType<typeof createLoginFormValidationSchema>
>;
