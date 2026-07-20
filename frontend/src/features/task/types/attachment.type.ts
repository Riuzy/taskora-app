import { TaskUser } from "./task.type";

export interface TaskAttachment {
    uuid: string;

    original_name: string;

    file_name: string;

    extension: string;

    mime_type: string;

    size: number;

    url: string;

    uploaded_by: TaskUser;

    created_at: string;
}