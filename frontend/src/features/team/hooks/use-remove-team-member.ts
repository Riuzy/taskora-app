import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { teamMemberApi } from "../api/team-member.api";

export function useRemoveTeamMember(
    teamUuid: string
) {
    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            userUuid: string
        ) =>
            teamMemberApi.remove(
                teamUuid,
                userUuid
            ),

        onSuccess: () => {

            toast.success(
                "Member removed successfully."
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