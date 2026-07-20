"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const pathname = usePathname();

    const token = useAuthStore((state) => state.token);

    const login = useAuthStore((state) => state.login);

    const logout = useAuthStore((state) => state.logout);

    const [hydrated, setHydrated] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe =
            useAuthStore.persist.onFinishHydration(() => {
                setHydrated(true);
            });

        setHydrated(
            useAuthStore.persist.hasHydrated()
        );

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        async function bootstrap() {
            if (!token) {

                setLoading(false);

                if (pathname === "/login") {
                    return;
                }

                router.replace("/login");

                return;
            }

            try {

                const user = await authApi.me();

                login(token, user);

                if (pathname === "/login") {
                    router.replace("/dashboard");
                }

            } catch {

                logout();

                router.replace("/login");

            } finally {

                setLoading(false);

            }
        }

        bootstrap();

    }, [
        hydrated,
        token,
        pathname,
        router,
        login,
        logout,
    ]);

    if (!hydrated || loading) {
        return null;
    }

    return children;
}