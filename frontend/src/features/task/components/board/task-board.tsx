"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import {
    arrayMove,
} from "@dnd-kit/sortable";

import { Task } from "../../types/task.type";

import { useUpdateTaskStatus } from "../../hooks/use-update-task-status";

import { BoardColumn } from "./board-column";
import { BoardLoading } from "./board-loading";
import { TaskDragOverlay } from "./drag-overlay";

interface TaskBoardProps {
    tasks: Task[];
    isLoading: boolean;
    projectUuid: string;
    teamUuid: string;
}

type BoardState = {
    todo: Task[];
    in_progress: Task[];
    review: Task[];
    done: Task[];
};

export function TaskBoard({
    tasks,
    isLoading,
    projectUuid,
    teamUuid,
}: TaskBoardProps) {

    const [activeTask, setActiveTask] =
        useState<Task | null>(null);

    const [board, setBoard] =
        useState<BoardState>({
            todo: [],
            in_progress: [],
            review: [],
            done: [],
        });

    const { mutate } =
        useUpdateTaskStatus(projectUuid);

    const [dragSource, setDragSource] =
        useState<keyof BoardState | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    useEffect(() => {

        if (activeTask) return;

        const groups: BoardState = {
            todo: [],
            in_progress: [],
            review: [],
            done: [],
        };

        tasks.forEach(task => {
            groups[task.status].push(task);
        });

        setBoard(groups);

    }, [tasks, activeTask]);

    const findContainer = (
        id: string
    ): keyof BoardState | null => {

        if (id in board) {
            return id as keyof BoardState;
        }

        for (const key of Object.keys(board) as Array<keyof BoardState>) {

            if (
                board[key].find(
                    (task) => task.uuid === id
                )
            ) {
                return key;
            }

        }

        return null;
    };

    const findTask = (
        id: string
    ) => {

        for (const key of Object.keys(board) as Array<keyof BoardState>) {

            const task = board[key].find(
                (task) => task.uuid === id
            );

            if (task) {
                return task;
            }

        }

        return null;
    };

    const getTaskIndex = (
        container: keyof BoardState,
        id: string
    ) => {

        return board[
            container
        ].findIndex(
            task =>
                task.uuid === id
        );

    };

const handleDragStart = (
    event: DragStartEvent
) => {

    const id = String(event.active.id);

    setDragSource(findContainer(id));

    const task = findTask(id);

    if (task) {
        setActiveTask(task);
    }

};

const handleDragOver = (
    event: DragOverEvent
) => {

    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
        !activeContainer ||
        !overContainer
    ) {
        return;
    }

    if (
        activeContainer === overContainer
    ) {
        return;
    }

    setBoard((prev) => {

        const source = [...prev[activeContainer]];
        const destination = [...prev[overContainer]];

        const sourceIndex = source.findIndex(
            task => task.uuid === activeId
        );

        if (sourceIndex === -1) {
            return prev;
        }

        const task = source[sourceIndex];

        source.splice(sourceIndex, 1);

        const updatedTask = {
            ...task,
            status: overContainer,
        };

        const destinationIndex =
            destination.findIndex(
                task => task.uuid === overId
            );

        if (destinationIndex >= 0) {

            destination.splice(
                destinationIndex,
                0,
                updatedTask
            );

        } else {

            destination.push(updatedTask);

        }

        return {
            ...prev,
            [activeContainer]: source,
            [overContainer]: destination,
        };

    });

};

const handleDragEnd = (
    event: DragEndEvent
) => {

    const { active, over } = event;

    if (!over) {

        setActiveTask(null);
        setDragSource(null);

        return;

    }

    const activeId = String(active.id);
    const overId = String(over.id);

    const source =
        dragSource;

    const destination =
        findContainer(overId);

    if (
        !source ||
        !destination
    ) {

        setActiveTask(null);
        setDragSource(null);

        return;

    }

    if (
        source !== destination
    ) {

        mutate({
            taskUuid: activeId,
            status: destination,
        });

    }

    setActiveTask(null);
    setDragSource(null);

};

    if (isLoading) {
        return <BoardLoading />;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={
                closestCorners
            }
            onDragStart={
                handleDragStart
            }
            onDragOver={
                handleDragOver
            }
            onDragEnd={
                handleDragEnd
            }
        >
            <div className="overflow-x-auto pb-2">
                <div className="flex min-w-max gap-6">

                    <BoardColumn
                        title="Todo"
                        status="todo"
                        tasks={board.todo}
                        projectUuid={projectUuid}
                        teamUuid={teamUuid}
                    />

                    <BoardColumn
                        title="In Progress"
                        status="in_progress"
                        tasks={board.in_progress}
                        projectUuid={projectUuid}
                        teamUuid={teamUuid}
                    />

                    <BoardColumn
                        title="Review"
                        status="review"
                        tasks={board.review}
                        projectUuid={projectUuid}
                        teamUuid={teamUuid}
                    />

                    <BoardColumn
                        title="Done"
                        status="done"
                        tasks={board.done}
                        projectUuid={projectUuid}
                        teamUuid={teamUuid}
                    />

                </div>
            </div>

            <TaskDragOverlay
                task={activeTask}
                projectUuid={projectUuid}
            />
        </DndContext>
    );
}