"use client";

import { FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

interface Props {
    onCreate: () => void;
}

export function ProjectEmpty({
    onCreate,
}: Props) {
    const { user } = useAuthStore();
    const canCreateProjects =
        !!user &&
        can(user.role as Role, permissions.project.create);

    return (
        <div className="rounded-xl border border-dashed py-20 text-center">
            <FolderOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
                No projects found
            </h2>

            <p className="mt-2 text-muted-foreground">
                Create your first project.
            </p>

            {canCreateProjects && (
                <Button
                    className="mt-6"
                    onClick={onCreate}
                >
                    Create Project
                </Button>
            )}
        </div>
    );
}