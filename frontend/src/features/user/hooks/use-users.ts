import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/user.api";

export function useUsers(
    search = ""
) {
    return useQuery({

        queryKey: [
            "users",
            search,
        ],

        queryFn: () =>
            userApi.getAll(search),

    });
}