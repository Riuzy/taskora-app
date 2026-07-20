"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { teamApi } from "../api/team.api";

export function useCreateTeam() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: teamApi.create,

        onSuccess: (response) => {

            toast.success(response.message);

            queryClient.invalidateQueries({
                queryKey: ["teams"],
            });

        },

        onError: (error: any) => {

            toast.error(
                error?.response?.data?.message ??
                    "Failed to create team."
            );

        },

    });

}