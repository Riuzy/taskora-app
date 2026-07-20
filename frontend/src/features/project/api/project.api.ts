import { api } from "@/lib/axios";

import {
    Project,
    ProjectPayload,
} from "../types/project.type";

interface ProjectListResponse {
    data: Project[];
}

interface ProjectResponse {
    data: Project;
}


export const getProjects = async (): Promise<Project[]> => {
    const { data } = await api.get<ProjectListResponse>("/projects");

    console.log("PROJECT RESPONSE:", data);

    return data.data;
};

export const getProject = async (
    uuid: string
): Promise<Project> => {
    const { data } = await api.get<ProjectResponse>(
        `/projects/${uuid}`
    );

    return data.data;
};

export const createProject = async (
    payload: ProjectPayload
): Promise<Project> => {
    const { data } = await api.post<ProjectResponse>(
        "/projects",
        payload
    );

    return data.data;
};

export const updateProject = async (
    uuid: string,
    payload: ProjectPayload
): Promise<Project> => {
    const { data } = await api.put<ProjectResponse>(
        `/projects/${uuid}`,
        payload
    );

    return data.data;
};

export const deleteProject = async (
    uuid: string
): Promise<void> => {
    await api.delete(`/projects/${uuid}`);
};