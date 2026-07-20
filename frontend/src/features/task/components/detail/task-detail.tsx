"use client";

import { TaskDetail as TaskDetailType } from "../../types/task-detail.type";

import { TaskHeader } from "./task-header";
import { TaskSidebar } from "./task-sidebar";
import { TaskDescription } from "./task-description";
import { TaskComments } from "./task-comments";
import { TaskAttachments } from "./task-attachments";
import { TaskActivities } from "./task-activities";

interface TaskDetailProps {
    projectId: string;
    task: TaskDetailType;
}

export function TaskDetail({
    projectId,
    task,
}: TaskDetailProps) {
    return (
         <div className="space-y-6">
            <TaskHeader
                projectId={projectId}
                task={task}
            />

           <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <TaskDescription
                            description={task.description}
                        />
                    </div>

                    <TaskSidebar
                        task={task}
                    />
                </div>

                <TaskComments
                    projectUuid={projectId}
                    taskUuid={task.uuid}
                    comments={task.comments}
                />

                <TaskAttachments
                    projectUuid={projectId}
                    taskUuid={task.uuid}
                    attachments={task.attachments}
                />

                <TaskActivities
                    activities={task.activities}
                />
        </div>
    );
}