import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { userApi } from "../api/user.api";

export function useCreateUser() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            userApi.create,

        onSuccess: () => {

            toast.success(
                "User created successfully."
            );

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

        },

    });

}