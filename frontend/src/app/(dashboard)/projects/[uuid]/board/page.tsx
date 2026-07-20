"use client";

import { useParams } from "next/navigation";

import { useProject } from "@/features/project/hooks/use-project";

import { useTasks } from "@/features/task/hooks/use-tasks";

import { TaskBoard } from "@/features/task/components/board/task-board";

export default function ProjectBoardPage() {
    const params = useParams();

    const uuid = params.uuid as string;

    const { data: project } =
        useProject(uuid);

    const {
        data: tasks = [],
        isLoading,
    } = useTasks(uuid);

    if (!project || !project.team?.uuid) return null;

    return (
        <TaskBoard
            tasks={tasks}
            isLoading={isLoading}
            projectUuid={uuid}
            teamUuid={project.team.uuid}
        />
    );
}