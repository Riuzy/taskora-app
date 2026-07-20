import { api } from "@/lib/axios";

import { TaskDetail } from "../types/task-detail.type";

interface GetTaskParams {
    projectId: string;
    taskId: string;
}

export async function getTask({
    projectId,
    taskId,
}: GetTaskParams): Promise<TaskDetail> {
    const response = await api.get(
        `/projects/${projectId}/tasks/${taskId}`
    );

    return response.data.data;
}