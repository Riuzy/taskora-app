"use client";

import { useDroppable } from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { cn } from "@/lib/utils";

import {
    Task,
    TaskStatus,
} from "../../types/task.type";

import { BoardEmpty } from "./board-empty";
import { BoardHeader } from "./board-header";
import { SortableTask } from "./sortable-task";

interface Props {
    title: string;
    status: TaskStatus;
    tasks: Task[];

    projectUuid: string;
    teamUuid: string;
}

export function BoardColumn({
    title,
    status,
    tasks,
    projectUuid,
    teamUuid,
}: Props) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
        data: {
            type: "column",
            status,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "flex h-[700px] w-[360px] shrink-0 flex-col rounded-2xl border bg-background shadow-sm transition-all",
                isOver &&
                    "border-primary ring-2 ring-primary/20"
            )}
        >
            <BoardHeader
                title={title}
                count={tasks.length}
                status={status}
                projectUuid={projectUuid}
                teamUuid={teamUuid}
            />

            <div className="flex-1 overflow-y-auto p-4">
                <SortableContext
                    items={tasks.map(
                        (task) => task.uuid
                    )}
                    strategy={
                        verticalListSortingStrategy
                    }
                >
                    <div className="space-y-4 min-h-full">
                        {tasks.length === 0 ? (
                            <BoardEmpty />
                        ) : (
                            tasks.map((task) => (
                                <SortableTask
                                    key={task.uuid}
                                    task={task}
                                    projectUuid={
                                        projectUuid
                                    }
                                />
                            ))
                        )}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}