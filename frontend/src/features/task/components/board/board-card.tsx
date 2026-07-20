"use client";

import { useRouter } from "next/navigation";

import {
    Calendar,
    MessageSquare,
    Paperclip,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

import { Task } from "../../types/task.type";
import { PriorityBadge } from "../badges/priority-badge";

interface BoardCardProps {
    projectUuid: string;
    task: Task;
}

function getInitials(name?: string | null) {
    if (!name) return "?";

    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

export function BoardCard({
    projectUuid,
    task,
}: BoardCardProps) {
    const router = useRouter();

    const overdue =
        task.due_date &&
        new Date(task.due_date) < new Date();

    const handleClick = () => {
        router.push(
            `/projects/${projectUuid}/tasks/${task.uuid}`
        );
    };
    const statusLabel = {
        todo: "Todo",
        in_progress: "In Progress",
        review: "Review",
        done: "Done",
    }[task.status];

    return (
        <div
            onClick={handleClick}
            className={cn(
                "group rounded-xl border bg-background p-4 transition-all duration-200",
                "cursor-grab active:cursor-grabbing select-none",
                "hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            )}
        >
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <h4 className="line-clamp-2 text-sm font-semibold">
                        {task.title}
                    </h4>

                    <PriorityBadge
                        priority={task.priority}
                    />
                </div>

                {task.description && (
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                        {task.description}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                                {getInitials(
                                    task.assignee?.name
                                )}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="text-xs font-medium">
                                {task.assignee?.name ??
                                    "Unassigned"}
                            </span>

                            <span className="text-[11px] text-muted-foreground">
                                Assignee
                            </span>
                        </div>
                    </div>

                    {task.due_date && (
                        <div
                            className={cn(
                                "flex items-center gap-1 text-xs",
                                overdue
                                    ? "text-red-500"
                                    : "text-muted-foreground"
                            )}
                        >
                            <Calendar className="h-3.5 w-3.5" />

                            {task.due_date}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-4 text-muted-foreground">
                       <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-xs">
                                {task.comments_count ?? 0}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-xs">
                                {task.attachments_count ?? 0}
                            </span>
                        </div>

                    </div>

                    <span className="text-[11px] text-muted-foreground">
                       {statusLabel}
                    </span>
                </div>
            </div>
        </div>
    );
}