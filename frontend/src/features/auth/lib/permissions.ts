export type Role = "manager" | "staff";

export const permissions = {
    project: {
        view: ["manager", "staff"] as const,
        create: ["manager"] as const,
        update: ["manager"] as const,
        delete: ["manager"] as const,
    },

    task: {
        view: ["manager", "staff"] as const,
        create: ["manager"] as const,
        update: ["manager"] as const,
        delete: ["manager"] as const,
        move: ["manager", "staff"] as const,
        comment: ["manager", "staff"] as const,
        attachment: ["manager", "staff"] as const,
    },

    team: {
        view: ["manager"] as const,
        create: ["manager"] as const,
        update: ["manager"] as const,
        delete: ["manager"] as const,
    },

    user: {
        view: ["manager"] as const,
        create: ["manager"] as const,
        update: ["manager"] as const,
        delete: ["manager"] as const,
    },
};

export function can(
    role: Role,
    roles: readonly Role[],
) {
    return roles.includes(role);
}