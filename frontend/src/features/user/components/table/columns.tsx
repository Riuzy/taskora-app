"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table";

import { User } from "../../types/user.type";

import { UserActions } from "./user-actions";

export const columns: ColumnDef<User>[] = [

    {
        id: "select",

        enableSorting: false,
        enableHiding: false,

        header: ({ table }) => (

            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />

        ),

        cell: ({ row }) => (

            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    row.toggleSelected(!!value)
                }
            />

        ),
    },

    {
        accessorKey: "employee_id",

        header: ({ column }) => (

            <DataTableColumnHeader
                column={column}
                title="Employee ID"
            />

        ),
    },

    {
        accessorKey: "name",

        enableHiding: false,

        header: ({ column }) => (

            <DataTableColumnHeader
                column={column}
                title="User"
            />

        ),

        cell: ({ row }) => {

            const user =
                row.original;

            return (

                <div className="flex items-center gap-3">

                    <Avatar className="h-9 w-9">

                        <AvatarFallback>

                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}

                        </AvatarFallback>

                    </Avatar>

                    <div>

                        <p className="font-medium">

                            {user.name}

                        </p>

                        <p className="text-xs text-muted-foreground">

                            {user.email}

                        </p>

                    </div>

                </div>

            );

        },
    },

    {
        accessorKey: "role",

        header: ({ column }) => (

            <DataTableColumnHeader
                column={column}
                title="Role"
            />

        ),

        cell: ({ row }) => {

            const role =
                row.original.role;

            return (

                <Badge
                    variant={
                        role === "manager"
                            ? "default"
                            : "secondary"
                    }
                >
                    {role === "manager"
                        ? "Manager"
                        : "Staff"}
                </Badge>

            );

        },
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

            <Badge
                className={
                    row.original.is_active
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                }
            >

                {row.original.is_active
                    ? "Active"
                    : "Inactive"}

            </Badge>

        ),
    },

    {
        id: "actions",

        enableSorting: false,
        enableHiding: false,

        cell: ({ row }) => (

            <UserActions
                user={row.original}
            />

        ),
    },

];