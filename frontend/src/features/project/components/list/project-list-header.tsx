"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

interface ProjectListHeaderProps {
    onCreate: () => void;
}

export function ProjectListHeader({
    onCreate,
}: ProjectListHeaderProps) {
    const { user } = useAuthStore();
    const canCreateProjects =
        !!user &&
        can(user.role as Role, permissions.project.create);

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Projects
                </h1>

                <p className="text-muted-foreground">
                    Manage your team&apos;s projects.
                </p>
            </div>

            {canCreateProjects && (
                <Button onClick={onCreate}>
                    <Plus className="mr-2 h-4 w-4" />

                    New Project
                </Button>
            )}
        </div>
    );
}