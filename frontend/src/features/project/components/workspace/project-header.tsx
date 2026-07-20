"use client";

import { CalendarDays, FolderKanban, Users } from "lucide-react";

import { Project } from "../../types/project.type";
import { ProjectBreadcrumb } from "./project-breadcrumb";
import { ProjectStatusBadge } from "./project-status-badge";

interface Props {
    project: Project;
}

export function ProjectHeader({
    project,
}: Props) {
    return (
        <div className="space-y-6">
            <ProjectBreadcrumb
                projectName={project.name}
            />

            <div className="rounded-xl border bg-card p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <FolderKanban className="h-7 w-7 text-primary" />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold">
                                {project.name}
                            </h1>

                            <ProjectStatusBadge
                                status={project.status}
                                label={project.status_label}
                            />
                        </div>

                        <p className="mt-2 text-muted-foreground">
                            {project.description ??
                                "No description provided."}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {project.team.name}
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                {project.start_date ?? "-"} - {project.end_date ?? "-"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}