"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table";

import { Team } from "../../types/team.type";
import TeamActions from "./team-actions";

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getInitials(name: string) {
    return name
        .trim()
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function TeamStatus({
    active,
}: {
    active: boolean;
}) {
    return (
        <Badge
            variant="outline"
            className={
                active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
            }
        >
            {active ? "Active" : "Inactive"}
        </Badge>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Columns                                  */
/* -------------------------------------------------------------------------- */

export const columns: ColumnDef<Team>[] = [
    {
        id: "select",

        enableSorting: false,
        enableHiding: false,

        header: ({ table }) => (
            <Checkbox
                aria-label="Select all"
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),

        cell: ({ row }) => (
            <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    row.toggleSelected(!!value)
                }
            />
        ),

        size: 40,
    },

    {
        accessorKey: "name",

        enableHiding: false,

        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Team"
            />
        ),

        cell: ({ row }) => {
            const { name, description } = row.original;

            return (
                <div className="max-w-xs">
                    <p className="font-medium leading-none">
                        {name}
                    </p>

                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {description || "-"}
                    </p>
                </div>
            );
        },
    },

    {
        accessorKey: "manager",

        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Manager"
            />
        ),

        cell: ({ row }) => {
            const { manager } = row.original;

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>
                            {getInitials(manager.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="leading-tight">
                        <p className="font-medium">
                            {manager.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Team Manager
                        </p>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: "members_count",

        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Members"
            />
        ),

        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />

                <span className="font-medium">
                    {row.original.members_count}
                </span>
            </div>
        ),
    },

    {
        accessorKey: "is_active",

        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Status"
            />
        ),

        cell: ({ row }) => (
            <TeamStatus
                active={row.original.is_active}
            />
        ),
    },

    {
        id: "actions",

        enableSorting: false,
        enableHiding: false,

        size: 60,

        cell: ({ row }) => (
            <div className="flex justify-end">
                <TeamActions
                    team={row.original}
                />
            </div>
        ),
    },
];