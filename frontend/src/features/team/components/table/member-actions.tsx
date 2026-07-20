"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

import RemoveMemberDialog from "../dialogs/remove-member-dialog";

import { TeamMember } from "../../types/team-member.type";

interface Props {

    member: TeamMember;

    teamUuid: string;

}

export default function RemoveMemberButton({

    member,

    teamUuid,

}: Props) {

    const [open, setOpen] =
        useState(false);

    return (
        <>

           <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <RemoveMemberDialog
                open={open}
                onOpenChange={setOpen}
                member={member}
                teamUuid={teamUuid}
            />

        </>
    );

}