"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import TeamForm from "../forms/team-form";

import { Team } from "../../types/team.type";
import {
    type TeamFormValues,
} from "../../schemas/team.schema";
import { useUpdateTeam } from "../../hooks/use-update-team";

interface EditTeamDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    team: Team | null;
}

export default function EditTeamDialog({
    open,
    onOpenChange,
    team,
}: EditTeamDialogProps) {
    const [defaultValues, setDefaultValues] =
        useState<TeamFormValues>();

    const { mutate, isPending } =
        useUpdateTeam();

    useEffect(() => {
        if (!team) return;

        setDefaultValues({
            name: team.name,
            description: team.description ?? "",
            is_active: team.is_active,
        });
    }, [team]);

    function handleSubmit(
        values: TeamFormValues
    ) {
        if (!team) return;

        mutate(
            {
                uuid: team.uuid,
                payload: values,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            }
        );
    }

    if (!team) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-xl">

                <DialogHeader>

                    <DialogTitle>
                        Edit Team
                    </DialogTitle>

                    <DialogDescription>
                        Update team information.
                    </DialogDescription>

                </DialogHeader>

                <TeamForm
                    defaultValues={defaultValues}
                    loading={isPending}
                    submitText="Save Changes"
                    onSubmit={handleSubmit}
                />

            </DialogContent>
        </Dialog>
    );
}