"use client";

import { useQuery } from "@tanstack/react-query";

import { teamApi } from "../api/team.api";

interface UseTeamsParams {
    search?: string;
    page?: number;
    perPage?: number;
}

export function useTeams({
    search = "",
    page = 1,
    perPage = 10,
}: UseTeamsParams = {}) {
    return useQuery({
        queryKey: ["teams", search, page, perPage],

        queryFn: () =>
            teamApi.getAll({
                search,
                page,
                perPage,
            }),

        placeholderData: (previousData) => previousData,
    });
}