"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

import { Project } from "../../types/project.type";

interface Props {
    project: Project;

    onEdit?: (project: Project) => void;

    onDelete?: (project: Project) => void;
}

export function ProjectCardMenu({
    project,
    onEdit,
    onDelete,
}: Props) {
    const { user } = useAuthStore();
    const canEditProject =
        !!user &&
        can(user.role as Role, permissions.project.update);
    const canDeleteProject =
        !!user &&
        can(user.role as Role, permissions.project.delete);

    if (!canEditProject && !canDeleteProject) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {canEditProject && (
                    <DropdownMenuItem
                        onClick={() =>
                            onEdit?.(project)
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                )}

                {canDeleteProject && (
                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                            onDelete?.(project)
                        }
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}