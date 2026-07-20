export interface User {
    id: number;

    uuid: string;

    employee_id: string;

    name: string;

    email: string;

    phone: string | null;

    address: string | null;

    gender: "male" | "female" | null;

    birth_date: string | null;

    avatar: string | null;

    role: "manager" | "staff";

    is_active: boolean;

    team?: {
        id: number;
        uuid: string;
        name: string;
    } | null;

    created_at: string;

    updated_at: string;
}

export interface UserPayload {
    employee_id: string;

    name: string;

    email: string;

    password?: string;

    phone?: string;

    address?: string;

    gender?: "male" | "female" | null;

    birth_date?: string | null;

    is_active: boolean;
}