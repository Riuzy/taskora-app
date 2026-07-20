export const taskKeys = {
    all: ["tasks"] as const,

    lists: () => [...taskKeys.all, "list"] as const,

    list: (projectUuid: string) =>
        [...taskKeys.lists(), projectUuid] as const,

    details: () =>
        [...taskKeys.all, "detail"] as const,

    detail: (
        projectUuid: string,
        taskUuid: string
    ) =>
        [
            ...taskKeys.details(),
            projectUuid,
            taskUuid,
        ] as const,
};