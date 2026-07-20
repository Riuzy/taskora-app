"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useProjects } from "@/features/project/hooks/use-projects";
import { useTeams } from "@/features/team/hooks/use-teams";
import { useUsers } from "@/features/user/hooks/use-users";
import { getTasks } from "@/features/task/api/task.api";
import TeamDetailPage from "@/features/team/pages/team-detail-page";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate, formatRelativeTime } from "@/lib/date";

const StatCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) => (
  <Card className="rounded-3xl border bg-white p-6">
    <CardHeader>
      <CardTitle className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <p className="text-4xl font-semibold">{value}</p>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const { data: projects = [] } = useProjects();
  const { data: teams = [] } = useTeams({ perPage: 1000 });
  const { data: users = [] } = useUsers();

  const visibleProjects = useMemo(() => {
    if (!user) return [];

    if (user.role === "manager") {
      return projects;
    }

    return projects.filter(
      (project) => project.team.uuid === user.team?.uuid
    );
  }, [projects, user]);

  const projectUuids = useMemo(
    () => visibleProjects.map((project) => project.uuid),
    [visibleProjects]
  );

  const tasksQuery = useQuery({
    queryKey: ["dashboard-tasks", projectUuids],
    queryFn: async () => {
      const results = await Promise.all(
        projectUuids.map((projectUuid) => getTasks(projectUuid))
      );
      return results.flat();
    },
    enabled: projectUuids.length > 0,
    placeholderData: [],
  });

  const tasks = tasksQuery.data ?? [];

  const overdueTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.due_date &&
          new Date(task.due_date) < new Date() &&
          task.status !== "done"
      ).length,
    [tasks]
  );

  const upcomingDeadlines = useMemo(() => {
    const now = new Date();
    const inSevenDays = new Date();
    inSevenDays.setDate(now.getDate() + 7);

    return [...tasks]
      .filter((task) => {
        if (!task.due_date) return false;
        const due = new Date(task.due_date);

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
      .slice(0, 5);
  }, [tasks]);

  const recentActivities = useMemo(
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

  const activeProjects = visibleProjects.filter(
    (project) => project.status === "active"
  ).length;

  const completedProjects = visibleProjects.filter(
    (project) => project.status === "completed"
  ).length;

  const managerProjectStatus = useMemo(
    () =>
      visibleProjects.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    [visibleProjects]
  );

  const managerTaskStatus = useMemo(
    () =>
      tasks.reduce(
        (acc, task) => {
          acc[task.status] = (acc[task.status] ?? 0) + 1;
          return acc;
        },
        {
          todo: 0,
          in_progress: 0,
          review: 0,
          done: 0,
        } as Record<string, number>
      ),
    [tasks]
  );

  const myTasks = useMemo(
    () =>
      user?.role === "staff"
        ? tasks.filter((task) => task.assignee?.uuid === user.uuid)
        : [],
    [tasks, user]
  );

  const myTaskCounts = useMemo(
    () =>
      myTasks.reduce(
        (acc, task) => {
          acc[task.status] = (acc[task.status] ?? 0) + 1;
          return acc;
        },
        {
          todo: 0,
          in_progress: 0,
          review: 0,
          done: 0,
        } as Record<string, number>
      ),
    [myTasks]
  );

  if (!user) {
    return null;
  }

  const teamUuid = user.team?.uuid;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Dashboard
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user.name}.
            </h1>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          {user.role === "manager"
            ? "Company overview of your projects, teams, tasks, and deadlines."
            : "Your personal workspace with your tasks, team, and upcoming deadlines."}
        </p>
      </div>

      {user.role === "manager" ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Projects" value={String(visibleProjects.length)} />
            <StatCard title="Active Projects" value={String(activeProjects)} />
            <StatCard title="Completed Projects" value={String(completedProjects)} />
            <StatCard title="Total Teams" value={String(teams.length)} />
            <StatCard title="Total Members" value={String(users.length)} />
            <StatCard title="Total Tasks" value={String(tasks.length)} />
            <StatCard title="Overdue Tasks" value={String(overdueTasks)} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,420px)]">
            <Card className="rounded-3xl border bg-white p-6">
              <CardHeader>
                <CardTitle>Task status chart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {Object.entries(managerTaskStatus).map(([status, count]) => {
                  const percentage = tasks.length
                    ? Math.round((count / tasks.length) * 100)
                    : 0;

                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="capitalize">{status.replace("_", " ")}</span>
                        <span>{count}</span>
                      </div>
                      <div className="rounded-full bg-slate-100 p-1">
                        <Progress value={percentage} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border bg-white p-6">
              <CardHeader>
                <CardTitle>Project progress chart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {Object.entries(managerProjectStatus).map(([status, count]) => {
                  const percentage = visibleProjects.length
                    ? Math.round((count / visibleProjects.length) * 100)
                    : 0;

                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="capitalize">{status.replace("_", " ")}</span>
                        <span>{count}</span>
                      </div>
                      <div className="rounded-full bg-slate-100 p-1">
                        <Progress value={percentage} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,320px)]">
            <Card className="rounded-3xl border bg-white p-6">
              <CardHeader>
                <CardTitle>Recent projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {visibleProjects.slice(0, 5).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent projects.</p>
                ) : (
                  visibleProjects
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.updated_at).getTime() -
                        new Date(a.updated_at).getTime()
                    )
                    .slice(0, 5)
                    .map((project) => (
                      <div key={project.uuid} className="rounded-2xl border bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.team.name}</p>
                          </div>
                          <Badge>{project.status_label}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Updated {formatRelativeTime(project.updated_at)}
                        </p>
                      </div>
                    ))
                )}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border bg-white p-6">
              <CardHeader>
                <CardTitle>Upcoming deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {upcomingDeadlines.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming deadlines in the next 7 days.</p>
                ) : (
                  upcomingDeadlines.map((task) => (
                    <div key={task.uuid} className="rounded-2xl border bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{task.title}</p>
                          <p className="text-sm text-muted-foreground">Due {formatDate(task.due_date)}</p>
                        </div>
                        <Badge>{task.status_label}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-3xl border bg-white p-6">
            <CardHeader>
              <CardTitle>Recent activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {recentActivities.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent task activity available.</p>
              ) : (
                recentActivities.map((task) => (
                  <div key={task.uuid} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Updated {formatRelativeTime(task.updated_at)}
                        </p>
                      </div>
                      <Badge>{task.status_label}</Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="My Tasks" value={String(myTasks.length)} />
            <StatCard title="Completed Tasks" value={String(myTaskCounts.done)} />
            <StatCard title="In Progress Tasks" value={String(myTaskCounts.in_progress)} />
            <StatCard title="Todo Tasks" value={String(myTaskCounts.todo)} />
            <StatCard title="Overdue Tasks" value={String(myTasks.filter((task) => task.due_date && new Date(task.due_date) < new Date() && task.status !== "done").length)} />
            <StatCard title="Active Projects" value={String(activeProjects)} />
            <StatCard title="My Assigned Tasks" value={String(myTasks.length)} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,320px)]">
            <Card className="rounded-3xl border bg-white p-6">
              <CardHeader>
                <CardTitle>Welcome</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  You have {myTasks.length} assigned tasks across {visibleProjects.length} active projects.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border bg-white p-6">
              <CardHeader>
                <CardTitle>Upcoming deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {upcomingDeadlines.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming deadlines in the next 7 days.</p>
                ) : (
                  upcomingDeadlines.map((task) => (
                    <div key={task.uuid} className="rounded-2xl border bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{task.title}</p>
                          <p className="text-sm text-muted-foreground">Due {formatDate(task.due_date)}</p>
                        </div>
                        <Badge>{task.status_label}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-3xl border bg-white p-6">
            <CardHeader>
              <CardTitle>Recent activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {recentActivities.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent activity available.</p>
              ) : (
                recentActivities.map((task) => (
                  <div key={task.uuid} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Updated {formatRelativeTime(task.updated_at)}
                        </p>
                      </div>
                      <Badge>{task.status_label}</Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {teamUuid ? (
            <div className="space-y-4">
              <Card className="rounded-3xl border bg-white p-6">
                <CardHeader>
                  <CardTitle>My Team</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Your current team is shown below.
                  </p>
                </CardContent>
              </Card>
              <TeamDetailPage
                uuid={teamUuid}
                canManageMembers={false}
                isStaffView
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
