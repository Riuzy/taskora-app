"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";

import { useTasks } from "../../hooks/use-tasks";

import { getColumns } from "./columns";
import { TaskToolbar } from "./task-toolbar";
import { TaskEmpty } from "./task-empty";
import { TaskLoading } from "./task-loading";

interface TaskTableProps {
    projectUuid: string;
    teamUuid: string;
}

export function TaskTable({
    projectUuid,
    teamUuid,
}: TaskTableProps) {
    const [search, setSearch] = useState("");

    const { data = [], isLoading } = useTasks(projectUuid);

    const filtered = useMemo(() => {
        return data.filter((task) =>
            task.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [data, search]);

    if (isLoading) {
        return <TaskLoading />;
    }

    return (
        <div className="space-y-4">
            <TaskToolbar
                projectUuid={projectUuid}
                teamUuid={teamUuid}
                search={search}
                onSearchChange={setSearch}
            />

            {filtered.length === 0 ? (
                <TaskEmpty />
            ) : (
                <DataTable
                    columns={getColumns({
                        projectUuid,
                        teamUuid,
                    })}
                    data={filtered}
                    searchColumn="title"
                />
            )}
        </div>
    );
}