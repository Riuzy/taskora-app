import { useQuery } from "@tanstack/react-query";

import { getTask } from "../api/get-task.api";
import { taskKeys } from "./task.keys";

interface UseTaskProps {
    projectId: string;
    taskId: string;
}

export function useTask({
    projectId,
    taskId,
}: UseTaskProps) {
    return useQuery({
        queryKey: taskKeys.detail(projectId, taskId),

        queryFn: () =>
            getTask({
                projectId,
                taskId,
            }),

        enabled: !!projectId && !!taskId,
    });
}