"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import TeamForm from "../forms/team-form";

import { TeamFormValues } from "../../schemas/team.schema";
import { useCreateTeam } from "../../hooks/use-create-team";

export default function CreateTeamDialog() {
    const [open, setOpen] = useState(false);

    const createTeam = useCreateTeam();

    function handleSubmit(values: TeamFormValues) {
        createTeam.mutate(values, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Team
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Create Team
                    </DialogTitle>

                    <DialogDescription>
                        Create a new team for your organization.
                    </DialogDescription>
                </DialogHeader>

                <TeamForm
                    loading={createTeam.isPending}
                    submitText="Create Team"
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}