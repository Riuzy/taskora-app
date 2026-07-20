import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { UserPayload } from "../types/user.type";

import { userApi } from "../api/user.api";

interface UpdateUserPayload {
    uuid: string;

    payload: UserPayload;
}

export function useUpdateUser() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            uuid,
            payload,
        }: UpdateUserPayload) =>
            userApi.update(
                uuid,
                payload
            ),

        onSuccess: () => {

            toast.success(
                "User updated successfully."
            );

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

        },

    });

}