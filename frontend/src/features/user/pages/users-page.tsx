"use client";

import UserTable from "../components/table/user-table";
import { useUsers } from "../hooks/use-users";

export default function UsersPage() {
    const {
        data,
        isLoading,
    } = useUsers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Users
                </h1>

                <p className="text-slate-500">
                    Manage organization users
                </p>

            </div>

            <UserTable
                users={data ?? []}
            />

        </div>
    );
}