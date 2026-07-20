"use client";

import { useState } from "react";
import {
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

import { User } from "../../types/user.type";

import EditUserDialog from "../dialogs/edit-user-dialog";
import DeleteUserDialog from "../dialogs/delete-user-dialog";

interface Props {
    user: User;
}

export function UserActions({
    user,
}: Props) {
    const [editOpen, setEditOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
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

                <DropdownMenuContent align="end">

                    <DropdownMenuItem
                        onClick={() =>
                            setEditOpen(true)
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />

                        Edit

                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() =>
                            setDeleteOpen(true)
                        }
                    >
                        <Trash2 className="mr-2 h-4 w-4" />

                        Delete

                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            <EditUserDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                user={user}
            />

            <DeleteUserDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                user={user}
            />
        </>
    );
}