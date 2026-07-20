"use client";

import { Project } from "../../types/project.type";

import { ProjectGrid } from "../cards/project-grid";
import { ProjectEmpty } from "./project-empty";
import { ProjectLoading } from "./project-loading";

interface ProjectListContentProps {
    loading: boolean;
    projects: Project[];
    onCreate: () => void;

    onEdit?: (project: Project) => void;
    onDelete?: (project: Project) => void;
}

export function ProjectListContent({
    loading,
    projects,
    onCreate,
    onEdit,
    onDelete,
}: ProjectListContentProps) {
    if (loading) {
        return <ProjectLoading />;
    }

    if (!projects.length) {
        return (
            <ProjectEmpty
                onCreate={onCreate}
            />
        );
    }

    return (
        <ProjectGrid
            projects={projects}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
}