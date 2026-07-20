"use client";

import { useParams } from "next/navigation";

import { TaskDetail } from "../components/detail/task-detail";
import { useTask } from "../hooks/use-task";

export default function TaskDetailPage() {
    const params = useParams();

    // Sesuaikan dengan nama folder dynamic route
    const projectId = params.uuid as string;
    const taskId = params.taskUuid as string;

    console.log(projectId);
    console.log(taskId);

    const {
        data: task,
        isLoading,
    } = useTask({ projectId, taskId });

    if (isLoading) {
        return (
            <div className="flex h-80 items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!task) {
        return (
            <div className="flex h-80 items-center justify-center">
                Task not found.
            </div>
        );
    }

    return (
        <TaskDetail
            projectId={projectId}
            task={task}
        />
    );
}