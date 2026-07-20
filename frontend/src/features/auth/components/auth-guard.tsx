"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../store/auth.store";

interface Props {
    children: React.ReactNode;
}

export function AuthGuard({
    children,
}: Props) {
    const router = useRouter();

    const {
        user,
        hydrated,
    } = useAuthStore();

    useEffect(() => {
        if (!hydrated) return;

        if (!user) {
            router.replace("/login");
        }
    }, [hydrated, user, router]);

    if (!hydrated || !user) {
        return null;
    }

    return <>{children}</>;
}