"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import UserForm from "../forms/user-form";

import { User } from "../../types/user.type";

import {
    UserFormValues,
} from "../../schemas/user.schema";

import { useUpdateUser } from "../../hooks/use-update-user";

interface Props {
    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    user: User;
}

export default function EditUserDialog({
    open,
    onOpenChange,
    user,
}: Props) {

    const { mutate, isPending } =
        useUpdateUser();

    const handleSubmit = (
        values: UserFormValues
    ) => {

        const payload = {
            ...values,
        };

        if (!payload.password) {
            delete payload.password;
        }

        mutate(
            {
                uuid: user.uuid,
                payload,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            }
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        Edit User

                    </DialogTitle>

                    <DialogDescription>

                        Update user information.

                    </DialogDescription>

                </DialogHeader>

                <UserForm
                    defaultValues={{
                        employee_id: user.employee_id,
                        name: user.name,
                        email: user.email,
                        password: "",
                        phone: user.phone ?? "",
                        address: user.address ?? "",
                        gender: user.gender,
                        birth_date: user.birth_date,
                        is_active: user.is_active,
                    }}
                    loading={isPending}
                    submitText="Save Changes"
                    onSubmit={handleSubmit}
                />

            </DialogContent>

        </Dialog>
    );
}