import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { userApi } from "../api/user.api";

export function useDeleteUser() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            userApi.delete,

        onSuccess: () => {

            toast.success(
                "User deleted successfully."
            );

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

        },

    });

}