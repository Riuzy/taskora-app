import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { createTask } from "../api/task.api";

import { TaskPayload } from "../types/task.type";

import { taskKeys } from "./task.keys";

interface CreateTaskPayload {
    projectUuid: string;

    payload: TaskPayload;
}

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectUuid,
            payload,
        }: CreateTaskPayload) =>
            createTask(
                projectUuid,
                payload
            ),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.list(
                    variables.projectUuid
                ),
            });
        },
    });
}