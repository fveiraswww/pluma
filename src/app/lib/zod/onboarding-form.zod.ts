import * as z from "zod";

export const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must be less than 20 characters.",
    }),
  location: z.string().min(2, {
    message: "Please enter a valid location.",
  }),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms.",
  }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
