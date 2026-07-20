"use client";

import { DragOverlay } from "@dnd-kit/core";

import { Task } from "../../types/task.type";
import { BoardCard } from "./board-card";

interface TaskDragOverlayProps {
    task: Task | null;
    projectUuid: string;
}

export function TaskDragOverlay({
    task,
    projectUuid,
}: TaskDragOverlayProps) {
    return (
        <DragOverlay
            dropAnimation={{
                duration: 200,
                easing: "ease",
            }}
        >
            {task ? (
                <div className="w-[330px] rotate-2 opacity-95 shadow-2xl">
                    <BoardCard
                        task={task}
                        projectUuid={projectUuid}
                    />
                </div>
            ) : null}
        </DragOverlay>
    );
}