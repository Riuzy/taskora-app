"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    teamApi,
    TeamPayload,
} from "../api/team.api";

interface UpdateTeamPayload {
    uuid: string;
    payload: TeamPayload;
}

export function useUpdateTeam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            payload,
        }: UpdateTeamPayload) =>
            teamApi.update(uuid, payload),

        onSuccess: (response) => {
            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: ["teams"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                    "Failed to update team."
            );
        },
    });
}