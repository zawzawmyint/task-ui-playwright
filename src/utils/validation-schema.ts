import { z } from "zod";

export const createTaskFormValidationSchema = () => {
  return z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters long" })
      .max(100, { message: "Title must be at most 100 characters long" }),
    description: z
      .string()
      .min(2, { message: "Description must be at least 2 characters long" })
      .max(100, { message: "Description must be at most 100 characters long" }),
  });
};

export const createLoginFormValidationSchema = () => {
  return z.object({
    // name: z
    //   .string()
    //   .min(2, { message: "Name must be at least 2 characters long" })
    //   .max(20, { message: "Name must be at most 20 characters long" }),
    email: z
      .email({ message: "Invalid email address" })
      .min(2, { message: "Email must be at least 2 characters long" })
      .max(20, { message: "Email must be at most 20 characters long" }),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
  });
};
