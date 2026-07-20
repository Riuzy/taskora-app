import { TaskUser } from "./task.type";

export interface TaskActivity {
    uuid: string;

    action: string;

    description: string;

    old_value: string | null;

    new_value: string | null;

    user: TaskUser;

    created_at: string;
}