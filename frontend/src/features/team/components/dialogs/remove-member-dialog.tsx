"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { TeamMember } from "../../types/team-member.type";

import { useRemoveTeamMember } from "../../hooks/use-remove-team-member";

interface Props {
    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    teamUuid: string;

    member: TeamMember;
}

export default function RemoveMemberDialog({
    open,
    onOpenChange,
    teamUuid,
    member,
}: Props) {

    const {
        mutate,
        isPending,
    } = useRemoveTeamMember(
        teamUuid
    );

    function handleDelete() {

        mutate(
            member.uuid,
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            }
        );

    }

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        Remove Member

                    </DialogTitle>

                    <DialogDescription>

                        Are you sure you want to remove{" "}
                        <strong>

                            {member.name}

                        </strong>{" "}
                        from this team?

                    </DialogDescription>

                </DialogHeader>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        Remove
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}