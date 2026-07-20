import { useQuery } from "@tanstack/react-query";

import { teamMemberApi } from "../api/team-member.api";

export function useTeamMembers(
    teamUuid: string
) {
    return useQuery({

        queryKey: [
            "team-members",
            teamUuid,
        ],

        queryFn: () =>
            teamMemberApi.getAll(
                teamUuid
            ),

        enabled: !!teamUuid,

    });
}