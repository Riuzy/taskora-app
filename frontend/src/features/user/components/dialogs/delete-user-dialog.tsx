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

import { User } from "../../types/user.type";

import { useDeleteUser } from "../../hooks/use-delete-user";

interface Props {
    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    user: User;
}

export default function DeleteUserDialog({
    open,
    onOpenChange,
    user,
}: Props) {

    const { mutate, isPending } =
        useDeleteUser();

    const handleDelete = () => {

        mutate(user.uuid, {
            onSuccess: () => {
                onOpenChange(false);
            },
        });

    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        Delete User

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        Are you sure you want to delete{" "}
                        <strong>

                            {user.name}

                        </strong>
                        ?

                        <br />

                        This action cannot be undone.

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>

                        Cancel

                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleDelete}
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