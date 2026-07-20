import { api } from "@/lib/axios";
import { Team } from "../types/team.type";

export interface TeamPayload {
    name: string;
    description?: string;
    is_active: boolean;
}

export interface TeamResponse {
    success: boolean;
    message: string;
    data: Team;
}

export interface TeamListResponse {
    success: boolean;
    message: string;
    data: Team[];
}

interface TeamQueryParams {
    search?: string;
    page?: number;
    perPage?: number;
}

export const teamApi = {
    getAll: async ({
        search = "",
        page = 1,
        perPage = 10,
    }: TeamQueryParams): Promise<Team[]> => {
        const { data } =
            await api.get<TeamListResponse>(
                "/teams",
                {
                    params: {
                        search,
                        page,
                        per_page: perPage,
                    },
                }
            );

        return data.data;
    },

    async getByUuid(
        uuid: string
    ): Promise<Team> {
        const { data } =
            await api.get<TeamResponse>(
                `/teams/${uuid}`
            );

        return data.data;
    },

    async myTeam(): Promise<Team> {
        const { data } =
            await api.get<TeamResponse>(
                "/teams/my-team"
            );

        return data.data;
    },

    async create(
        payload: TeamPayload
    ): Promise<TeamResponse> {
        const { data } =
            await api.post<TeamResponse>(
                "/teams",
                payload
            );

        return data;
    },

    async update(
        uuid: string,
        payload: TeamPayload
    ): Promise<TeamResponse> {
        const { data } =
            await api.put<TeamResponse>(
                `/teams/${uuid}`,
                payload
            );

        return data;
    },

    async delete(
        uuid: string
    ): Promise<TeamResponse> {
        const { data } =
            await api.delete<TeamResponse>(
                `/teams/${uuid}`
            );

        return data;
    },
};