import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadAttachment } from "../api/task.api";
import { taskKeys } from "./task.keys";

export function useUploadAttachment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectUuid,
            taskUuid,
            file,
        }: {
            projectUuid: string;
            taskUuid: string;
            file: File;
        }) =>
            uploadAttachment(
                projectUuid,
                taskUuid,
                file
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