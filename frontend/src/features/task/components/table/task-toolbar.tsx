"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

import { CreateTaskDialog } from "../dialogs/create-task-dialog";

interface TaskToolbarProps {
    projectUuid: string;

    search: string;

    teamUuid: string;

    onSearchChange: (value: string) => void;
}

export function TaskToolbar({
    projectUuid,
    search,
    onSearchChange,
    teamUuid,
}: TaskToolbarProps) {
    const { user } = useAuthStore();
    const canCreateTasks =
        !!user &&
        can(user.role as Role, permissions.task.create);

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
                <Search
                    className="
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-muted-foreground
                    "
                />

                <Input
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search task..."
                    className="pl-9"
                />
            </div>

            {canCreateTasks && (
                <CreateTaskDialog
                    projectUuid={projectUuid}
                    teamUuid={teamUuid}
                />
            )}
        </div>
    );
}