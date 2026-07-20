"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    can,
    permissions,
    type Role,
} from "@/features/auth/lib/permissions";

import { Task } from "../../types/task.type";
import { BoardCard } from "./board-card";

interface Props {
    task: Task;
    projectUuid: string;
}

export function SortableTask({
    task,
    projectUuid,
}: Props) {
    const { user } = useAuthStore();
    const canMoveTask =
        !!user &&
        can(user.role as Role, permissions.task.move) &&
        (user.role === "manager" ||
            task.assignee?.uuid === user.uuid);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.uuid,
        data: {
            type: "task",
            task,
            status: task.status,
        },
        disabled: !canMoveTask,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={
                isDragging
                    ? "opacity-40"
                    : ""
            }
        >
            <BoardCard
                task={task}
                projectUuid={projectUuid}
            />
        </div>
    );
}