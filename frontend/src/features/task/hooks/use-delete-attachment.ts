import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAttachment } from "../api/task.api";
import { taskKeys } from "./task.keys";

export function useDeleteAttachment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectUuid,
            taskUuid,
            attachmentUuid,
        }: {
            projectUuid: string;
            taskUuid: string;
            attachmentUuid: string;
        }) =>
            deleteAttachment(
                projectUuid,
                taskUuid,
                attachmentUuid
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