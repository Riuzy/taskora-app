export interface TeamMember {
    id: number;

    uuid: string;

    employee_id: string;

    name: string;

    email: string;

    avatar: string | null;

    role: "manager" | "staff";

    is_active: boolean;
}
export interface AddTeamMemberPayload {
    user_uuids: string[];
}