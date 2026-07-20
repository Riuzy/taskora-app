"use client";

import { format } from "date-fns";
import { CalendarDays, CircleUserRound, Flag, ListTodo } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { TaskDetail } from "../../types/task-detail.type";

interface TaskSidebarProps {
    task: TaskDetail;
}

function formatDate(date?: string | null) {
    if (!date) return "-";

    return format(new Date(date), "dd MMM yyyy");
}

export function TaskSidebar({ task }: TaskSidebarProps) {
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle>Task Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="space-y-4">
                    <Item
                        icon={<ListTodo className="h-4 w-4" />}
                        label="Status"
                        value={
                            <Badge variant="secondary">
                                {task.status_label}
                            </Badge>
                        }
                    />

                    <Item
                        icon={<Flag className="h-4 w-4" />}
                        label="Priority"
                        value={<Badge>{task.priority_label}</Badge>}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <Item
                        icon={<CircleUserRound className="h-4 w-4" />}
                        label="Assigned To"
                        value={task.assignee?.name ?? "-"}
                    />

                    <Item
                        icon={<CircleUserRound className="h-4 w-4" />}
                        label="Created By"
                        value={task.creator?.name ?? "-"}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <Item
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Start Date"
                        value={formatDate(task.start_date)}
                    />

                    <Item
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Due Date"
                        value={formatDate(task.due_date)}
                    />

                    <Item
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Completed At"
                        value={formatDate(task.completed_at)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

interface ItemProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}

function Item({
    icon,
    label,
    value,
}: ItemProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground">
                {icon}
            </div>

            <div className="flex-1 space-y-1">
                <p className="text-xs text-muted-foreground">
                    {label}
                </p>

                <div className="text-sm font-medium">
                    {value}
                </div>
            </div>
        </div>
    );
}