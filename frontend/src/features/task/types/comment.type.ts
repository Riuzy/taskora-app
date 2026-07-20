import { TaskUser } from "./task.type";

export interface TaskComment {
    uuid: string;

    content: string;

    user: TaskUser;

    created_at: string;
}