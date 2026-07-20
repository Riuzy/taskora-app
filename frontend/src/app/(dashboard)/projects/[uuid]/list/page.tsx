"use client";

import { useParams } from "next/navigation";

import { useProject } from "@/features/project/hooks/use-project";

import { TaskTable } from "@/features/task/components/table/task-table";

export default function ProjectListPage() {
    const params = useParams();

    const uuid = params.uuid as string;

    const {
        data: project,
        isLoading,
    } = useProject(uuid);

    if (isLoading) {
        return null;
    }

    if (!project) {
        return null;
    }

    return (
                <TaskTable
                    projectUuid={project.uuid}
                    teamUuid={project.team.uuid}
                />
    );
}