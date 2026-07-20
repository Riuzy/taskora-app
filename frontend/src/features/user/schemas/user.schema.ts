import { z } from "zod";

export const userSchema = z.object({

    employee_id: z
        .string()
        .min(1, "Employee ID is required"),

    name: z
        .string()
        .min(3, "Name is required"),

    email: z
        .string()
        .email("Invalid email"),

    password: z
        .string()
        .min(8, "Password minimum 8 characters")
        .optional()
        .or(z.literal("")),

    phone: z.string().optional(),

    address: z.string().optional(),

    gender: z
        .enum([
            "male",
            "female",
        ])
        .nullable()
        .optional(),

    birth_date: z
        .string()
        .nullable()
        .optional(),

    is_active: z.boolean(),

});

export type UserFormValues =
    z.infer<typeof userSchema>;