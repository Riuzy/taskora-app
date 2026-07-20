"use client";

import {
    DataTable,
} from "@/components/data-table/data-table";

import { TeamMember } from "../../types/team-member.type";

import { memberColumns } from "./member-columns";

interface Props {
    teamUuid: string;
    members: TeamMember[];
    canManageMembers?: boolean;
}

export default function MemberTable({
    teamUuid,
    members,
    canManageMembers = true,
}: Props) {
    return (
        <DataTable
            columns={
                memberColumns(
                    teamUuid,
                    canManageMembers
                )
            }
            data={members}
            searchColumn="name"
        />
    );
}
