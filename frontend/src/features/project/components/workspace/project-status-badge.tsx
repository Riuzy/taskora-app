"use client";

import { Badge } from "@/components/ui/badge";

import { ProjectStatus } from "../../types/project.type";

interface ProjectStatusBadgeProps {
    status: ProjectStatus;
    label: string;
}

const variants: Record<ProjectStatus, string> = {
    planning:
        "bg-slate-100 text-slate-700 border-slate-200",

    active:
        "bg-emerald-100 text-emerald-700 border-emerald-200",

    on_hold:
        "bg-amber-100 text-amber-700 border-amber-200",

    completed:
        "bg-blue-100 text-blue-700 border-blue-200",

    cancelled:
        "bg-red-100 text-red-700 border-red-200",
};

export function ProjectStatusBadge({
    status,
    label,
}: ProjectStatusBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={variants[status]}
        >
            {label}
        </Badge>
    );
}