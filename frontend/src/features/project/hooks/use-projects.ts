import { useQuery } from "@tanstack/react-query";

import { getProjects } from "../api/project.api";
import { projectKeys } from "./project.keys";

export function useProjects() {
    return useQuery({
        queryKey: projectKeys.lists(),
        queryFn: getProjects,
    });
}