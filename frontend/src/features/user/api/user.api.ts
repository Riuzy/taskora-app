import { api } from "@/lib/axios";

import {
    User,
    UserPayload,
} from "../types/user.type";

export const userApi = {

    async getAll(search = "") {

        const { data } =
            await api.get("/users", {
                params: {
                    search,
                },
            });

        return data.data;

    },

        async getAvailable() {

        const { data } = await api.get(
            "/users/available"
        );

        return data.data;

    },

    async getByUuid(
        uuid: string
    ) {

        const { data } =
            await api.get(
                `/users/${uuid}`
            );

        return data.data as User;

    },

    async create(
        payload: UserPayload
    ) {

        const { data } =
            await api.post(
                "/users",
                payload
            );

        return data;

    },

    async update(
        uuid: string,
        payload: UserPayload
    ) {

        const { data } =
            await api.put(
                `/users/${uuid}`,
                payload
            );

        return data;

    },

    async delete(
        uuid: string
    ) {

        const { data } =
            await api.delete(
                `/users/${uuid}`
            );

        return data;

    },

};