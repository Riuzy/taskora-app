"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Team } from "../../types/team.type";
import { useDeleteTeam } from "../../hooks/use-delete-team";

interface DeleteTeamDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    team: Team;
}

export default function DeleteTeamDialog({
    open,
    onOpenChange,
    team,
}: DeleteTeamDialogProps) {
    const { mutate, isPending } = useDeleteTeam();

    function handleDelete() {
        mutate(team.uuid, {
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Delete Team
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete
                        <span className="font-semibold">
                            {" "}
                            {team.name}
                        </span>
                        ?
                        <br />
                        <br />
                        This action cannot be undone.
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isPending
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}