import { Badge } from "@/components/ui/badge";

import { TaskPriority } from "../../types/task.type";

interface PriorityBadgeProps {
    priority: TaskPriority;
}

const variants: Record<TaskPriority, string> = {
    low: "bg-gray-100 text-gray-700",

    medium: "bg-blue-100 text-blue-700",

    high: "bg-orange-100 text-orange-700",

    critical: "bg-red-100 text-red-700",
};

export function PriorityBadge({
    priority,
}: PriorityBadgeProps) {
    return (
        <Badge className={variants[priority]}>
            {priority}
        </Badge>
    );
}