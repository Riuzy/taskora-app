"use client";

import { useRouter } from "next/navigation";
import {
    CalendarDays,
    FolderKanban,
    Users,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

import { Project } from "../../types/project.type";
import { ProjectCardMenu } from "./project-card-menu";

interface ProjectCardProps {
    project: Project;

    onEdit?: (project: Project) => void;
    onDelete?: (project: Project) => void;
}

export function ProjectCard({
    project,
    onEdit,
    onDelete,

}: ProjectCardProps) {
    const router = useRouter();
    const { user } = useAuthStore();
    const canManageProjects =
        !!user &&
        (can(user.role as Role, permissions.project.update) ||
            can(user.role as Role, permissions.project.delete));

    return (
        <Card
            onClick={() =>
                router.push(
                    `/projects/${project.uuid}`
                )
            }
            className="group cursor-pointer transition-colors duration-200 hover:border-primary/30 hover:shadow-md"
        >
            <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                        <FolderKanban className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>

                    {canManageProjects && (
                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <ProjectCardMenu
                                project={project}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </div>
                    )}
                </div>

                <div>
                    <CardTitle>
                        {project.name}
                    </CardTitle>

                    <CardDescription>
                        {project.code}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="line-clamp-2 min-h-[40px] text-sm text-muted-foreground">
                    {project.description ??
                        "No description provided."}
                </p>

                <Badge className="w-fit">
                    {project.status_label}
                </Badge>

                <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />

                    <span>{project.team.name}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />

                    <span>
                        {project.start_date ?? "-"}{" "}
                        -{" "}
                        {project.end_date ?? "-"}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}