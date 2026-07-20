import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/features/user/types/user.type";

interface AuthState {
    token: string | null;
    user: User | null;

    hydrated: boolean;

    setHydrated: (state: boolean) => void;

    login: (token: string, user: User) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,

            hydrated: false,

            setHydrated: (state) =>
                set({
                    hydrated: state,
                }),

            login: (token, user) =>
                set({
                    token,
                    user,
                }),

            logout: () =>
                set({
                    token: null,
                    user: null,
                }),
        }),
        {
            name: "taskora-auth",

            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);