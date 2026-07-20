import { z } from "zod";

export const taskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(255),

    description: z.string().optional(),

    status: z.enum([
        "todo",
        "in_progress",
        "review",
        "done",
    ]),

    priority: z.enum([
        "low",
        "medium",
        "high",
        "critical",
    ]),

    assignee_id: z.number().nullable().optional(),

    start_date: z.string().nullable().optional(),

    due_date: z.string().nullable().optional(),
});

export type TaskFormValues =
    z.infer<typeof taskSchema>;