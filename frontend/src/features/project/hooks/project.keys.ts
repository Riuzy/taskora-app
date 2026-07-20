export const projectKeys = {
    all: ["projects"] as const,

    lists: () => [...projectKeys.all, "list"] as const,

    list: (filters?: unknown) =>
        [...projectKeys.lists(), filters] as const,

    details: () =>
        [...projectKeys.all, "detail"] as const,

    detail: (uuid: string) =>
        [...projectKeys.details(), uuid] as const,
};