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

import UserForm from "../forms/user-form";

import {
    UserFormValues,
} from "../../schemas/user.schema";

import { useCreateUser } from "../../hooks/use-create-user";

export default function CreateUserDialog() {
    const [open, setOpen] = useState(false);

    const { mutate, isPending } =
        useCreateUser();

    const handleSubmit = (
        values: UserFormValues
    ) => {
        const payload = {
            ...values,
        };

        if (!payload.password) {
            delete payload.password;
        }

        mutate(payload, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>

                <Button>

                    <Plus className="mr-2 h-4 w-4" />

                    New User

                </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        Create User

                    </DialogTitle>

                    <DialogDescription>

                        Create a new user account.

                    </DialogDescription>

                </DialogHeader>

                <UserForm
                    loading={isPending}
                    submitText="Create User"
                    onSubmit={handleSubmit}
                />

            </DialogContent>

        </Dialog>
    );
}