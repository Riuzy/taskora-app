export type ProjectStatus =
    | "planning"
    | "active"
    | "on_hold"
    | "completed"
    | "cancelled";

export interface TeamOption {
    uuid: string;
    name: string;
}

export interface UserOption {
    uuid: string;
    name: string;
}

export interface Project {
    uuid: string;

    code: string;

    name: string;

    description: string | null;

    status: ProjectStatus;

    status_label: string;

    start_date: string | null;

    end_date: string | null;

    is_active: boolean;

    team: TeamOption;

    creator: UserOption;

    created_at: string;

    updated_at: string;
}

export interface ProjectPayload {
    team_uuid: string;

    code: string;

    name: string;

    description?: string;

    status: ProjectStatus;

    start_date?: string;

    end_date?: string;

    is_active: boolean;
}