"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Task } from "../../types/task.type";

import { StatusBadge } from "../badges/status-badge";

import { PriorityBadge } from "../badges/priority-badge";

import { TaskActions } from "./task-actions";

interface ColumnsProps {
    projectUuid: string;
    teamUuid: string;
}

export function getColumns({
    projectUuid,
    teamUuid,
}: ColumnsProps): ColumnDef<Task>[] {
    return [
        {
            accessorKey: "title",

            header: "Title",
        },

        {
            accessorKey: "status",

            header: "Status",

            cell: ({ row }) => (
                <StatusBadge
                    status={row.original.status}
                />
            ),
        },

        {
            accessorKey: "priority",

            header: "Priority",

            cell: ({ row }) => (
                <PriorityBadge
                    priority={
                        row.original.priority
                    }
                />
            ),
        },

        {
            header: "Assignee",

            cell: ({ row }) =>
                row.original.assignee?.name ??
                "-",
        },

        {
            accessorKey: "due_date",

            header: "Due Date",

            cell: ({ row }) =>
                row.original.due_date ??
                "-",
        },

        {
            id: "actions",

            enableSorting: false,

            cell: ({ row }) => (
                <TaskActions
                    projectUuid={projectUuid}
                    teamUuid={teamUuid}
                    task={row.original}
                />
            ),
        },
    ];
}