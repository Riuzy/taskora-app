import { useQuery } from "@tanstack/react-query";

import { teamApi } from "../api/team.api";

export function useTeam(
    uuid?: string
) {

    return useQuery({

        queryKey: [
            "team",
            uuid,
        ],

        queryFn: () =>
            teamApi.getByUuid(
                uuid as string
            ),

        enabled: !!uuid,

    });

}