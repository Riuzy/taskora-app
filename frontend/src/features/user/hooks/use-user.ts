import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/user.api";

export function useUser(
    uuid: string
) {
    return useQuery({

        queryKey: [
            "users",
            uuid,
        ],

        queryFn: () =>
            userApi.getByUuid(uuid),

        enabled: !!uuid,

    });
}