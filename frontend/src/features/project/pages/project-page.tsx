"use client";

import { useMemo, useState } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useProjects } from "../hooks/use-projects";
import { Project } from "../types/project.type";

import { ProjectListContent } from "../components/list/project-list-content";
import { ProjectListHeader } from "../components/list/project-list-header";
import { ProjectListToolbar } from "../components/list/project-list-toolbar";
import { CreateProjectDialog } from "../components/dialogs/create-project-dialog";
import { EditProjectDialog } from "../components/dialogs/edit-project-dialog";
import { DeleteProjectDialog } from "../components/dialogs/delete-project-dialog";

export function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [openCreate, setOpenCreate] = useState(false);

    const [editingProject, setEditingProject] =
    useState<Project | null>(null);

    const [deletingProject, setDeletingProject] =
    useState<Project | null>(null);

    const {
        data: projects = [],
        isLoading,
        isError,
    } = useProjects();

    const user = useAuthStore((state) => state.user);

    const visibleProjects = useMemo(() => {
        if (!user) return [];

        if (user.role === "manager") {
            return projects;
        }

        return projects.filter(
            (project) =>
                project.team.uuid === user.team?.uuid
        );
    }, [projects, user]);

    const filteredProjects = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return visibleProjects;
        }

        return visibleProjects.filter((project) => {
            return (
                project.name
                    .toLowerCase()
                    .includes(keyword) ||
                project.code
                    .toLowerCase()
                    .includes(keyword) ||
                project.team.name
                    .toLowerCase()
                    .includes(keyword)
            );
        });
    }, [visibleProjects, search]);

    return (
        <>
            <div className="space-y-6">
                <ProjectListHeader
                    onCreate={() => setOpenCreate(true)}
                />

                <ProjectListToolbar
                    search={search}
                    onSearchChange={setSearch}
                />

                <ProjectListContent
                    loading={isLoading}
                    projects={filteredProjects}
                    onCreate={() => setOpenCreate(true)}
                    onEdit={setEditingProject}
                    onDelete={setDeletingProject}
                />

                {isError && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                        Failed to load projects.
                    </div>
                )}
            </div>

            <CreateProjectDialog
                open={openCreate}
                onOpenChange={setOpenCreate}
            />

            <EditProjectDialog
                open={!!editingProject}
                project={editingProject}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingProject(null);
                    }
                }}
            />

            <DeleteProjectDialog
                open={!!deletingProject}
                project={deletingProject}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingProject(null);
                    }
                }}
            />
        </>
    );
}