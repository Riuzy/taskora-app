import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { teamMemberApi } from "../api/team-member.api";

export function useAddTeamMember(
    teamUuid: string
) {
    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            payload: {
                user_uuids: string[];
            }
        ) =>
            teamMemberApi.add(
                teamUuid,
                payload
            ),

        onSuccess: () => {

            toast.success(
                "Members added successfully."
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "team-members",
                    teamUuid,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "available-users",
                ],
            });

        },

    });
}