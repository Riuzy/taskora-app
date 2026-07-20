import { z } from "zod";

export const teamSchema = z.object({
    name: z
        .string()
        .min(3, "Team name must be at least 3 characters."),

    description: z.string().optional(),

    is_active: z.boolean(),
});

export type TeamFormValues = z.infer<typeof teamSchema>;