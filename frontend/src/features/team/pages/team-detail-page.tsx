"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
    Users,
    UserCog,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
    useTeam,
} from "../hooks/use-team";

import {
    useTeamMembers,
} from "../hooks/use-team-members";

import MemberTable
from "../components/table/member-table";

import AddMemberDialog
from "../components/dialogs/add-member-dialog";

interface Props {
    uuid: string;
    canManageMembers?: boolean;
    isStaffView?: boolean;
}

export default function TeamDetailPage({
    uuid,
    canManageMembers = true,
    isStaffView = false,
}: Props) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const hydrated = useAuthStore((state) => state.hydrated);

    const {
        data: team,
    } =
        useTeam(uuid);

    const {
        data: members = [],
    } =
        useTeamMembers(uuid);

    const [
        open,
        setOpen,
    ] =
        useState(false);

    useEffect(() => {
        if (!hydrated || !team || !user) {
            return;
        }

        if (
            user.role === "staff" &&
            user.team?.uuid !== team.uuid
        ) {
            router.replace("/dashboard");
        }
    }, [hydrated, router, team, user]);

    if (!team) {
        return null;
    }

    if (
        user?.role === "staff" &&
        user.team?.uuid !== team.uuid
    ) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {team.name}
                    </h1>
                    <p className="text-muted-foreground">
                        {team.description}
                    </p>
                </div>

            </div>

            <div className="rounded-lg border bg-white p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <UserCog />
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Team Leader
                            </p>
                            <p className="font-medium">
                                {team.manager?.name}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border bg-slate-50 p-4">
                            <p className="text-sm text-muted-foreground">
                                Active Projects
                            </p>
                            <p className="text-2xl font-semibold">
                                {team.active_projects_count ?? 0}
                            </p>
                        </div>
                        <div className="rounded-lg border bg-slate-50 p-4">
                            <p className="text-sm text-muted-foreground">
                                Active Tasks
                            </p>
                            <p className="text-2xl font-semibold">
                                {team.active_tasks_count ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {isStaffView ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {members.map((member) => {
                        const isLeader =
                            member.uuid === team.manager?.uuid;

                        return (
                            <div
                                key={member.uuid}
                                className="rounded-2xl border bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-14 w-14">
                                        {member.avatar ? (
                                            <AvatarImage src={member.avatar} />
                                        ) : (
                                            <AvatarFallback>
                                                {member.name
                                                    .split(" ")
                                                    .map((word) => word[0])
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>

                                    <div>
                                        <p className="text-lg font-semibold">
                                            {member.name}
                                        </p>
                                        {isLeader && (
                                            <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                Team Leader
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <MemberTable
                    teamUuid={uuid}
                    members={members}
                    canManageMembers={canManageMembers}
                />
            )}

            {!isStaffView && canManageMembers && (
                <AddMemberDialog
                    open={open}
                    onOpenChange={setOpen}
                    teamUuid={uuid}
                />
            )}
        </div>
    );
}
