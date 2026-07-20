import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "../api/project.api";

import { projectKeys } from "./project.keys";

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: projectKeys.lists(),
            });
        },
    });
}