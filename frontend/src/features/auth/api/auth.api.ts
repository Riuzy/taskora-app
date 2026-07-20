import { api } from "@/lib/axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export const authApi = {
    login: async (payload: LoginPayload) => {
        const { data } = await api.post("/auth/login", payload);

        return data;
    },

    me: async () => {
        const { data } = await api.get("/auth/me");

        return data.data;
    },

    logout: async () => {
        const { data } = await api.post("/auth/logout");

        return data;
    },
};