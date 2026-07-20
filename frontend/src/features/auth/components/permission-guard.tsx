"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../store/auth.store";
import type { Role } from "../lib/permissions";

interface Props {
    children: React.ReactNode;
    roles: readonly Role[];
}

export function PermissionGuard({
    children,
    roles,
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
            return;
        }

        if (!roles.includes(user.role as Role)) {
            router.replace("/dashboard");
        }
    }, [hydrated, user, roles, router]);

    if (!hydrated || !user) {
        return null;
    }

    if (!roles.includes(user.role as Role)) {
        return null;
    }

    return children;
}