"use client";

import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Task } from "../../types/task.type";

interface TaskHeaderProps {
    projectId: string;
    task: Task;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function TaskHeader({
    projectId,
    task,
    onEdit,
    onDelete,
}: TaskHeaderProps) {
    const { user } = useAuthStore();
    const canEditTask =
        !!user &&
        can(user.role as Role, permissions.task.update);
    const canDeleteTask =
        !!user &&
        can(user.role as Role, permissions.task.delete);

    return (
        <div className="space-y-4 rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/projects/${projectId}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Board
                    </Link>
                </Button>

                <div className="flex items-center gap-2">
                    {canEditTask && (
                        <Button
                            variant="outline"
                            onClick={onEdit}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    )}

                    {canDeleteTask && (
                        <Button
                            variant="destructive"
                            onClick={onDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                    {task.title}
                </h1>

                <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                        {task.status_label}
                    </Badge>

                    <Badge>
                        {task.priority_label}
                    </Badge>
                </div>

                {task.description && (
                    <p className="text-muted-foreground">
                        {task.description}
                    </p>
                )}
            </div>
        </div>
    );
}