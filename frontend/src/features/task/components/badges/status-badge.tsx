import { Badge } from "@/components/ui/badge";

import { TaskStatus } from "../../types/task.type";

interface StatusBadgeProps {
    status: TaskStatus;
}

const variants: Record<TaskStatus, string> = {
    todo: "bg-slate-100 text-slate-700",

    in_progress: "bg-blue-100 text-blue-700",

    review: "bg-yellow-100 text-yellow-700",

    done: "bg-green-100 text-green-700",
};

const labels: Record<TaskStatus, string> = {
    todo: "Todo",

    in_progress: "In Progress",

    review: "Review",

    done: "Done",
};

export function StatusBadge({
    status,
}: StatusBadgeProps) {
    return (
        <Badge className={variants[status]}>
            {labels[status]}
        </Badge>
    );
}