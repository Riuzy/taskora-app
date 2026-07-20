import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "../api/task.api";
import { taskKeys } from "./task.keys";

export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectUuid,
            taskUuid,
            commentUuid,
        }: {
            projectUuid: string;
            taskUuid: string;
            commentUuid: string;
        }) =>
            deleteComment(
                projectUuid,
                taskUuid,
                commentUuid
            ),

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