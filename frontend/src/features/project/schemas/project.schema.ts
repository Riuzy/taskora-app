import { z } from "zod";

export const projectSchema = z
    .object({
        team_uuid: z
            .string()
            .min(1, "Team is required"),

        code: z
            .string()
            .trim()
            .min(3, "Project code is required")
            .max(20),

        name: z
            .string()
            .trim()
            .min(3, "Project name is required")
            .max(150),

        description: z
            .string()
            .max(1000)
            .optional()
            .or(z.literal("")),

        status: z.enum([
            "planning",
            "active",
            "on_hold",
            "completed",
            "cancelled",
        ]),

        start_date: z
            .string()
            .optional()
            .or(z.literal("")),

        end_date: z
            .string()
            .optional()
            .or(z.literal("")),

        is_active: z.boolean(),
    })
    .refine(
        (data) => {
            if (!data.start_date || !data.end_date) {
                return true;
            }

            return (
                new Date(data.start_date) <=
                new Date(data.end_date)
            );
        },
        {
            path: ["end_date"],
            message:
                "End date must be after start date.",
        }
    );

export type ProjectFormValues =
    z.infer<typeof projectSchema>;