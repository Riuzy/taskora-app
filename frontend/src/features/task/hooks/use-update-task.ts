import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateTask } from "../api/task.api";

import { TaskPayload } from "../types/task.type";

import { taskKeys } from "./task.keys";

interface UpdateTaskPayload {
    projectUuid: string;

    taskUuid: string;

    payload: TaskPayload;
}

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectUuid,
            taskUuid,
            payload,
        }: UpdateTaskPayload) =>
            updateTask(
                projectUuid,
                taskUuid,
                payload
            ),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.list(
                    variables.projectUuid
                ),
            });

            queryClient.invalidateQueries({
                queryKey: taskKeys.detail(
                    variables.projectUuid,
                    variables.taskUuid
                ),
            });
        },
    });
}