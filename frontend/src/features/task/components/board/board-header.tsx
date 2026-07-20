"use client";

import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

import { CreateTaskDialog } from "../dialogs/create-task-dialog";

import { TaskStatus } from "../../types/task.type";

interface Props {
    title: string;
    count: number;
    status: TaskStatus;
    projectUuid: string;
    teamUuid: string;
}

export function BoardHeader({
    title,
    count,
    projectUuid,
    teamUuid,
}: Props) {
    const { user } = useAuthStore();
    const canCreateTasks =
        !!user &&
        can(user.role as Role, permissions.task.create);

    return (
        <div className="border-b">
            <div className="flex items-center justify-between px-5 pt-5">
                <h3 className="font-semibold">{title}</h3>

                <Badge variant="secondary">{count}</Badge>
            </div>

            {canCreateTasks && (
                <div className="px-3 pb-3 pt-2">
                    <CreateTaskDialog
                        projectUuid={projectUuid}
                        teamUuid={teamUuid}
                    >
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Task
                        </Button>
                    </CreateTaskDialog>
                </div>
            )}
        </div>
    );
}