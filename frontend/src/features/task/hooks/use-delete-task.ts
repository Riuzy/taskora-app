import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { deleteTask } from "../api/task.api";

import { taskKeys } from "./task.keys";

interface DeleteTaskPayload {
    projectUuid: string;

    taskUuid: string;
}

export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectUuid,
            taskUuid,
        }: DeleteTaskPayload) =>
            deleteTask(
                projectUuid,
                taskUuid
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