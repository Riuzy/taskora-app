"use client";

import { DataTable } from "@/components/data-table";

import { Team } from "../../types/team.type";
import { columns } from "./columns";
import CreateTeamDialog from "../dialogs/create-team-dialog";

interface Props {
    teams: Team[];
}

export default function TeamTable({
    teams,  
}: Props) {
    return (
        <DataTable
            columns={columns}
            data={teams}
            searchColumn="name"
            searchPlaceholder="Search team..."
            toolbar={<CreateTeamDialog />}
        />
    );
}