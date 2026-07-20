import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/user.api";

export function useAvailableUsers() {

    return useQuery({

        queryKey: [
            "available-users",
        ],

        queryFn: () =>
            userApi.getAvailable(),

    });

}