"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { formatDate, formatRelativeTime } from "@/lib/date";

import { useProject } from "@/features/project/hooks/use-project";
import { useTeam } from "@/features/team/hooks/use-team";
import { useTeamMembers } from "@/features/team/hooks/use-team-members";
import { useTasks } from "@/features/task/hooks/use-tasks";

export default function ProjectOverviewPage() {
    const params = useParams();
    const uuid = params.uuid as string;

    const {
        data: project,
        isLoading: isProjectLoading,
    } = useProject(uuid);

    const {
        data: tasks = [],
        isLoading: isTasksLoading,
    } = useTasks(uuid);

    const {
        data: team,
    } = useTeam(project?.team.uuid);

    const {
        data: members = [],
    } = useTeamMembers(project?.team.uuid ?? "");

    const isLoading = isProjectLoading || isTasksLoading;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "done").length;
    const inProgressTasks = tasks.filter((task) => task.status === "in_progress").length;
    const reviewTasks = tasks.filter((task) => task.status === "review").length;
    const overdueTasks = tasks.filter(
        (task) =>
            task.due_date &&
            new Date(task.due_date) < new Date() &&
            task.status !== "done"
    ).length;

    const upcomingDeadlines = useMemo(
        () =>
            tasks
                .filter((task) => {
                    if (!task.due_date) {
                        return false;
                    }

                    const due = new Date(task.due_date);
                    const now = new Date();
                    const inSevenDays = new Date();
                    inSevenDays.setDate(now.getDate() + 7);

                    return (
                        task.status !== "done" &&
                        due >= now &&
                        due <= inSevenDays
                    );
                })
                .sort(
                    (a, b) =>
                        new Date(a.due_date!).getTime() -
                        new Date(b.due_date!).getTime()
                )
                .slice(0, 5),
        [tasks]
    );

    const recentUpdates = useMemo(
        () =>
            [...tasks]
                .sort(
                    (a, b) =>
                        new Date(b.updated_at).getTime() -
                        new Date(a.updated_at).getTime()
                )
                .slice(0, 5),
        [tasks]
    );

    if (isLoading || !project) {
        return (
            <div className="flex h-80 items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,320px)]">
                <Card className="rounded-3xl border bg-white p-6">
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Project overview
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold">
                                {project.name}
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {project.description ?? "No description provided."}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <p className="text-sm text-muted-foreground">Status</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge>{project.status_label}</Badge>
                                </div>
                            </div>
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <p className="text-sm text-muted-foreground">Team</p>
                                <p className="mt-2 text-base font-medium">{project.team.name}</p>
                            </div>
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <p className="text-sm text-muted-foreground">Timeline</p>
                                <p className="mt-2 text-base font-medium">
                                    {formatDate(project.start_date)} - {formatDate(project.end_date)}
                                </p>
                            </div>
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <p className="text-sm text-muted-foreground">Owner</p>
                                <p className="mt-2 text-base font-medium">
                                    {team?.manager?.name ?? project.creator.name}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <p className="text-sm text-muted-foreground">Created</p>
                                <p className="mt-2 text-base font-medium">
                                    {formatDate(project.created_at)}
                                </p>
                            </div>
                            <div className="rounded-2xl border bg-slate-50 p-5">
                                <p className="text-sm text-muted-foreground">Updated</p>
                                <p className="mt-2 text-base font-medium">
                                    {formatDate(project.updated_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid gap-4">
                    <Card className="rounded-3xl border bg-white p-6">
                        <CardHeader>
                            <CardTitle>Project statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <p className="text-sm text-muted-foreground">Total tasks</p>
                                    <p className="mt-2 text-3xl font-semibold">{totalTasks}</p>
                                </div>
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <p className="text-sm text-muted-foreground">Completed</p>
                                    <p className="mt-2 text-3xl font-semibold">{completedTasks}</p>
                                </div>
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <p className="text-sm text-muted-foreground">In progress</p>
                                    <p className="mt-2 text-3xl font-semibold">{inProgressTasks}</p>
                                </div>
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <p className="text-sm text-muted-foreground">Review</p>
                                    <p className="mt-2 text-3xl font-semibold">{reviewTasks}</p>
                                </div>
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <p className="text-sm text-muted-foreground">Overdue</p>
                                    <p className="mt-2 text-3xl font-semibold">{overdueTasks}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border bg-white p-6">
                        <CardHeader>
                            <CardTitle>Team overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <p className="text-sm text-muted-foreground">Team leader</p>
                                    <p className="mt-2 text-base font-medium">
                                        {team?.manager?.name ?? "No team leader assigned"}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {members.length > 0 ? (
                                        members.map((member) => (
                                            <div
                                                key={member.uuid}
                                                className="flex items-center justify-between rounded-2xl border bg-slate-50 p-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-11 w-11">
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
                                                        <p className="font-medium">{member.name}</p>
                                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No team members available.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card className="rounded-3xl border bg-white p-6">
                    <CardHeader>
                        <CardTitle>Upcoming deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {upcomingDeadlines.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No upcoming deadlines in the next 7 days.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {upcomingDeadlines.map((task) => (
                                    <div
                                        key={task.uuid}
                                        className="rounded-2xl border bg-slate-50 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-medium">{task.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Due {formatDate(task.due_date)}
                                                </p>
                                            </div>
                                            <Badge>{task.status_label}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border bg-white p-6">
                    <CardHeader>
                        <CardTitle>Recent updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentUpdates.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No recent updates for project tasks.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentUpdates.map((task) => (
                                    <div
                                        key={task.uuid}
                                        className="rounded-2xl border bg-slate-50 p-4"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="font-medium">{task.title}</p>
                                            <Badge>{task.status_label}</Badge>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Updated {formatRelativeTime(task.updated_at)}
                                            {task.assignee ? ` · ${task.assignee.name}` : ""}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
