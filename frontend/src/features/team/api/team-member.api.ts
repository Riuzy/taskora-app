import { api } from "@/lib/axios";

import {
    TeamMember,
    AddTeamMemberPayload,
} from "../types/team-member.type";

export const teamMemberApi = {

    async getAll(teamUuid: string) {

        const { data } = await api.get(
            `/teams/${teamUuid}/members`
        );

        return data.data as TeamMember[];

    },

    async add(
        teamUuid: string,
        payload: AddTeamMemberPayload
    ) {

        const { data } = await api.post(
            `/teams/${teamUuid}/members`,
            payload
        );

        return data;

    },

    async remove(
        teamUuid: string,
        userUuid: string
    ) {

        const { data } = await api.delete(
            `/teams/${teamUuid}/members/${userUuid}`
        );

        return data;

    },

};