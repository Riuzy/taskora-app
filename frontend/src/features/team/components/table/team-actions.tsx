"use client";

import { useState } from "react";
import Link from "next/link";

import {
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditTeamDialog from "../dialogs/edit-team-dialog";
import DeleteTeamDialog from "../dialogs/delete-team-dialog";

import { Team } from "../../types/team.type";

interface Props {
    team: Team;
}

export default function TeamActions({
    team,
}: Props) {

    const [openEdit, setOpenEdit] =
        useState(false);

    const [openDelete, setOpenDelete] =
        useState(false);

    return (

        <>

            <DropdownMenu>

                <DropdownMenuTrigger asChild>

                    <Button
                        variant="ghost"
                        size="icon"
                    >

                        <MoreHorizontal className="h-4 w-4" />

                    </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-44"
                >
                    <DropdownMenuItem>

                            <Link
                                href={`/teams/${team.uuid}`}
                                className="flex items-center"
                            >
                                <Eye className="mr-2 h-4 w-4" />

                                View Team
                            </Link>

                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() =>
                            setOpenEdit(true)
                        }
                    >

                        <Pencil className="mr-2 h-4 w-4" />

                        Edit

                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() =>
                            setOpenDelete(true)
                        }
                        className="text-red-600"
                    >

                        <Trash2 className="mr-2 h-4 w-4" />

                        Delete

                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            <EditTeamDialog
                open={openEdit}
                onOpenChange={setOpenEdit}
                team={team}
            />

            <DeleteTeamDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                team={team}
            />

        </>

    );

}