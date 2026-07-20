"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";
import { Task } from "../../types/task.type";

import { EditTaskDialog } from "../dialogs/edit-task-dialog";

import { DeleteTaskDialog } from "../dialogs/delete-task-dialog";

interface TaskActionsProps {
    projectUuid: string;

    teamUuid: string;

    task: Task;
}

export function TaskActions({
    projectUuid,
    teamUuid,
    task,
}: TaskActionsProps) {
    const { user } = useAuthStore();
    const canManageTasks =
        !!user &&
        (can(user.role as Role, permissions.task.update) ||
            can(user.role as Role, permissions.task.delete));

    if (!canManageTasks) {
        return null;
    }

    return (
        <div className="flex justify-end gap-2">
            <EditTaskDialog
                projectUuid={projectUuid}
                teamUuid={teamUuid}
                task={task}
            />

            <DeleteTaskDialog
                projectUuid={projectUuid}
                task={task}
            />
        </div>
    );
}