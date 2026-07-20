"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import { TeamMember } from "../../types/team-member.type";
import MemberActions from "./member-actions";

export const memberColumns = (
    teamUuid: string,
    canManageMembers = true
): ColumnDef<TeamMember>[] => {
    const columns: ColumnDef<TeamMember>[] = [
        {
            accessorKey: "employee_id",
            header: "Employee ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => (
                <Badge variant="secondary">
                    {row.original.role}
                </Badge>
            ),
        },
        {
            accessorKey: "is_active",
            header: "Status",
            cell: ({ row }) =>
                row.original.is_active ? (
                    <Badge>Active</Badge>
                ) : (
                    <Badge variant="destructive">
                        Inactive
                    </Badge>
                ),
        },
    ];

    if (canManageMembers) {
        columns.push({
            id: "actions",
            cell: ({ row }) => (
                <MemberActions
                    member={row.original}
                    teamUuid={teamUuid}
                />
            ),
        });
    }

    return columns;
};
