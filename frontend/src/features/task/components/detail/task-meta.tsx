"use client";

import { Calendar } from "lucide-react";

import { Card } from "@/components/ui/card";

import { PriorityBadge } from "../badges/priority-badge";
import { StatusBadge } from "../badges/status-badge";

import { Task } from "../../types/task.type";

interface Props {
    task: Task;
}

export function TaskMeta({
    task,
}: Props) {
    return (
        <Card className="p-6">

            <h2 className="mb-6 text-lg font-semibold">
                Details
            </h2>

            <div className="space-y-5">

                <div>
                    <p className="text-xs text-muted-foreground">
                        STATUS
                    </p>

                    <StatusBadge
                        status={task.status}
                    />
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">
                        PRIORITY
                    </p>

                    <PriorityBadge
                        priority={task.priority}
                    />
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">
                        ASSIGNEE
                    </p>

                    <p>
                        {task.assignee?.name ??
                            "Unassigned"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">
                        REPORTER
                    </p>

                    <p>
                        {task.creator?.name}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">
                        DUE DATE
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                        <Calendar className="h-4 w-4 text-muted-foreground" />

                        <span>
                            {task.due_date ??
                                "-"}
                        </span>

                    </div>

                </div>

            </div>

        </Card>
    );
}