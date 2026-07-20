import { api } from "@/lib/axios";

import {
    Task,
    TaskPayload,
    TaskStatus,
} from "../types/task.type";

interface TaskListResponse {
    data: Task[];
}

interface TaskResponse {
    data: Task;
}

export const getTasks = async (
    projectUuid: string
): Promise<Task[]> => {
    const { data } = await api.get<TaskListResponse>(
        `/projects/${projectUuid}/tasks`
    );

    return data.data;
};

export const getTask = async (
    projectUuid: string,
    taskUuid: string
): Promise<Task> => {
    const { data } = await api.get<TaskResponse>(
        `/projects/${projectUuid}/tasks/${taskUuid}`
    );

    return data.data;
};

export const createTask = async (
    projectUuid: string,
    payload: TaskPayload
): Promise<Task> => {
    const { data } = await api.post<TaskResponse>(
        `/projects/${projectUuid}/tasks`,
        payload
    );

    return data.data;
};

export const updateTask = async (
    projectUuid: string,
    taskUuid: string,
    payload: TaskPayload
): Promise<Task> => {
    const { data } = await api.put<TaskResponse>(
        `/projects/${projectUuid}/tasks/${taskUuid}`,
        payload
    );

    return data.data;
};

export const deleteTask = async (
    projectUuid: string,
    taskUuid: string
): Promise<void> => {
    await api.delete(
        `/projects/${projectUuid}/tasks/${taskUuid}`
    );
};

export interface CommentPayload {
    content: string;
}

export const createComment = async (
    projectUuid: string,
    taskUuid: string,
    payload: CommentPayload
) => {
    const { data } = await api.post(
        `/projects/${projectUuid}/tasks/${taskUuid}/comments`,
        payload
    );

    return data.data;
};

export const deleteComment = async (
    projectUuid: string,
    taskUuid: string,
    commentUuid: string
) => {
    await api.delete(
        `/projects/${projectUuid}/tasks/${taskUuid}/comments/${commentUuid}`
    );
};

export const uploadAttachment = async (
    projectUuid: string,
    taskUuid: string,
    file: File
) => {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await api.post(
        `/projects/${projectUuid}/tasks/${taskUuid}/attachments`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data.data;
};

export const deleteAttachment = async (
    projectUuid: string,
    taskUuid: string,
    attachmentUuid: string
) => {
    await api.delete(
        `/projects/${projectUuid}/tasks/${taskUuid}/attachments/${attachmentUuid}`
    );
};

export interface UpdateTaskStatusPayload {
    status: TaskStatus;
}

export const updateTaskStatus = async (
    projectUuid: string,
    taskUuid: string,
    payload: UpdateTaskStatusPayload
): Promise<Task> => {
    const { data } = await api.patch<TaskResponse>(
        `/projects/${projectUuid}/tasks/${taskUuid}/status`,
        payload
    );

    return data.data;
};