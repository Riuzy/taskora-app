import { useQuery } from "@tanstack/react-query";

import { getTasks } from "../api/task.api";

import { taskKeys } from "./task.keys";

export function useTasks(
    projectUuid: string
) {
    return useQuery({
        queryKey: taskKeys.list(
            projectUuid
        ),

        queryFn: () =>
            getTasks(projectUuid),

        enabled: !!projectUuid,
    });
}