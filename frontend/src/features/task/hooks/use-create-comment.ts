import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment } from "../api/task.api";
import { taskKeys } from "./task.keys";

export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectUuid,
            taskUuid,
            content,
        }: {
            projectUuid: string;
            taskUuid: string;
            content: string;
        }) =>
            createComment(projectUuid, taskUuid, {
                content,
            }),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.detail(
                    variables.projectUuid,
                    variables.taskUuid
                ),
            });
        },
    });
}