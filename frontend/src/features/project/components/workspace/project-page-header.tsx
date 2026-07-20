"use client";

import { Project } from "../../types/project.type";
import { ProjectHeader } from "./project-header";
import { ProjectNavigation } from "./project-navigation";

interface Props {
    project: Project;
}

export function ProjectPageHeader({
    project,
}: Props) {
    return (
        <div className="space-y-6">
            <ProjectHeader project={project} />

            <ProjectNavigation
                projectUuid={project.uuid}
            />
        </div>
    );
}