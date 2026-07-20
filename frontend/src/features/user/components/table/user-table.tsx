"use client";

import { DataTable } from "@/components/data-table";

import { User } from "../../types/user.type";

import { columns } from "./columns";

import CreateUserDialog from "../dialogs/create-user-dialog";

interface Props {
    users: User[];
}

export default function UserTable({
    users,
}: Props) {
    return (
        <DataTable
            columns={columns}
            data={users}
            searchColumn="name"
            searchPlaceholder="Search user..."
            toolbar={<CreateUserDialog />}
        />
    );
}