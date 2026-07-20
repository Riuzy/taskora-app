"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useAvailableUsers } from "@/features/user/hooks/use-available-users";

import { useAddTeamMember } from "../../hooks/use-add-team-member";

import { User } from "@/features/user/types/user.type";

interface Props {
    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    teamUuid: string;
}

export default function AddMemberDialog({
    open,
    onOpenChange,
    teamUuid,
}: Props) {

    const {
        data: users = [],
        isLoading,
    } = useAvailableUsers();

    const {
        mutate,
        isPending,
    } = useAddTeamMember(
        teamUuid
    );

    const [selected, setSelected] =
        useState<string[]>([]);

    useEffect(() => {

        if (!open) {

            setSelected([]);

        }

    }, [open]);

    function toggle(uuid: string) {

        setSelected((prev) => {

            if (prev.includes(uuid)) {

                return prev.filter(
                    (item) => item !== uuid
                );

            }

            return [
                ...prev,
                uuid,
            ];

        });

    }

    function handleSubmit() {

        mutate(
            {
                user_uuids: selected,
            },
            {
                onSuccess: () => {

                    setSelected([]);

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

            <DialogContent className="sm:max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        Add Members

                    </DialogTitle>

                    <DialogDescription>

                        Select available users to join this team.

                    </DialogDescription>

                </DialogHeader>

                <div className="max-h-96 space-y-3 overflow-y-auto">

                    {isLoading && (

                        <p className="text-center text-sm text-muted-foreground">

                            Loading users...

                        </p>

                    )}

                    {!isLoading &&
                        users.length === 0 && (

                            <p className="text-center text-sm text-muted-foreground">

                                No available users.

                            </p>

                        )}

                    {users.map((user: User) => {

                        const checked =
                            selected.includes(
                                user.uuid
                            );

                        return (

                            <div
                                key={user.uuid}
                                onClick={() =>
                                    toggle(user.uuid)
                                }
                                className={`
                                    flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors
                                    ${
                                        checked
                                            ? "border-primary bg-primary/5"
                                            : "hover:bg-muted/50"
                                    }
                                `}
                            >

                                <div>

                                    <p className="font-medium">

                                        {user.name}

                                    </p>

                                    <p className="text-sm text-muted-foreground">

                                        {user.employee_id}

                                    </p>

                                </div>

                                <Checkbox
                                    checked={checked}
                                    onCheckedChange={() =>
                                        toggle(
                                            user.uuid
                                        )
                                    }
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                />

                            </div>

                        );

                    })}

                </div>

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
                        disabled={
                            selected.length === 0 ||
                            isPending
                        }
                        onClick={handleSubmit}
                    >
                        {isPending
                            ? "Adding..."
                            : `Add Members (${selected.length})`}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}