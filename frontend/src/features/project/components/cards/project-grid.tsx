"use client";

import { Project } from "../../types/project.type";
import { ProjectCard } from "./project-card";

interface Props {
    projects: Project[];

    onEdit?: (project: Project) => void;
    onDelete?: (project: Project) => void;
}

export function ProjectGrid({
    projects,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div
            className="
                grid
                gap-6
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4
            "
        >
            {projects.map((project) => (
                <ProjectCard
                    key={project.uuid}
                    project={project}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}