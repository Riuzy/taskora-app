export interface TeamManager {
    uuid: string;
    name: string;
    email: string;
}

export interface Team {
    uuid: string;
    name: string;
    description: string | null;

    manager: TeamManager;

    manager_id: number;

    members_count: number;

    active_projects_count?: number;

    active_tasks_count?: number;

    is_active: boolean;

    created_at: string;

    updated_at: string;
}

export interface TeamPagination {
    data: Team[];

    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}