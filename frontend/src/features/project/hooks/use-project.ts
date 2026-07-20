import { useQuery } from "@tanstack/react-query";

import { getProject } from "../api/project.api";
import { projectKeys } from "./project.keys";

export function useProject(uuid: string) {
    return useQuery({
        queryKey: projectKeys.detail(uuid),
        queryFn: () => getProject(uuid),
        enabled: !!uuid,
    });
}