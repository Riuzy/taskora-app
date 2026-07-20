export type TaskStatus =
    | "todo"
    | "in_progress"
    | "review"
    | "done";

export type TaskPriority =
    | "low"
    | "medium"
    | "high"
    | "critical";

export interface TaskUser {
    id: number;
    uuid: string;
    name: string;
    email: string;
}

export interface Task {
    uuid: string;

    title: string;

    description: string | null;

    status: TaskStatus;

    status_label: string;

    priority: TaskPriority;

    priority_label: string;

    assignee: TaskUser | null;

    creator: TaskUser | null;

    start_date: string | null;

    due_date: string | null;

    completed_at: string | null;

    created_at: string;

    updated_at: string;

    comments_count: number;

    attachments_count: number;
}

export interface TaskPayload {
    title: string;

    description?: string;

    status: TaskStatus;

    priority: TaskPriority;

    assignee_id?: number | null;

    start_date?: string | null;

    due_date?: string | null;

    comments_count?: number;

    attachments_count?: number;
}

export interface UpdateTaskStatusPayload {
    status: TaskStatus;
    position?: number;
}