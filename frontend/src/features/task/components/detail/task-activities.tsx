"use client";

import { History } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { TaskActivity } from "../../types/activity.type";

interface TaskActivitiesProps {
    activities: TaskActivity[];
}

export function TaskActivities({
    activities,
}: TaskActivitiesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Activity
                </CardTitle>
            </CardHeader>

            <CardContent>
                {activities.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-6">
                        {activities.map((activity) => (
                            <ActivityItem
                                key={activity.uuid}
                                activity={activity}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    return (
        <div className="py-8 text-center text-sm text-muted-foreground">
            No activity yet.
        </div>
    );
}

interface ActivityItemProps {
    activity: TaskActivity;
}

function ActivityItem({
    activity,
}: ActivityItemProps) {
    return (
        <div className="relative flex gap-4">
            <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-primary" />

                <div className="mt-1 h-full w-px bg-border" />
            </div>

            <div className="flex-1 pb-6">
                <div className="flex items-center justify-between">
                    <p className="font-medium">
                        {activity.user.name}
                    </p>

                    <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                            new Date(activity.created_at),
                            {
                                addSuffix: true,
                                locale: id,
                            }
                        )}
                    </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                </p>
            </div>
        </div>
    );
}