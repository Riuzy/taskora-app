"use client";

import { ReactNode, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useProject } from "@/features/project/hooks/use-project";

import {
    ProjectPageHeader,
} from "@/features/project/components/workspace";

interface LayoutProps {
    children: ReactNode;
}

export default function ProjectLayout({
    children,
}: LayoutProps) {
    const params = useParams();
    const router = useRouter();

    const uuid = params.uuid as string;

    const {
        data: project,
        isLoading,
    } = useProject(uuid);

    const user = useAuthStore((state) => state.user);
    const hydrated = useAuthStore((state) => state.hydrated);

    useEffect(() => {
        if (!hydrated || isLoading) {
            return;
        }

        if (!user) {
            router.replace("/login");
            return;
        }

        if (
            user.role === "staff" &&
            project?.team?.uuid &&
            user.team?.uuid !== project.team.uuid
        ) {
            router.replace("/dashboard");
        }
    }, [hydrated, isLoading, project, router, user]);

    if (!hydrated || isLoading) {
        return null;
    }

    if (!project) {
        return null;
    }

    if (
        user?.role === "staff" &&
        project.team?.uuid &&
        user.team?.uuid !== project.team.uuid
    ) {
        return null;
    }

    return (
        <div className="space-y-6">
            <ProjectPageHeader
                project={project}
            />

            <div className="rounded-xl border p-6">
                {children}
            </div>
        </div>
    );
}