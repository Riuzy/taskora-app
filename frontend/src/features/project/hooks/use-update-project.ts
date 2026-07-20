import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import {
    updateProject,
} from "../api/project.api";

import {
    ProjectPayload,
} from "../types/project.type";

import { projectKeys } from "./project.keys";

interface UpdateProjectPayload {
    uuid: string;
    payload: ProjectPayload;
}

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            payload,
        }: UpdateProjectPayload) =>
            updateProject(uuid, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: projectKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: projectKeys.detail(
                    variables.uuid
                ),
            });
        },
    });
}