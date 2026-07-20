"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { ProjectForm } from "../forms/project-form";

import {
    projectSchema,
    ProjectFormValues,
} from "../../schemas/project.schema";

import { useTeams } from "@/features/team/hooks/use-teams";

import { useUpdateProject } from "../../hooks/use-update-project";

import { Project } from "../../types/project.type";

interface Team {
    uuid: string;
    name: string;
}

interface EditProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: Project | null;
}

export function EditProjectDialog({
    open,
    onOpenChange,
    project,

}: EditProjectDialogProps) {
    const updateProject = useUpdateProject();

    const {
        data: teams = [],
        isLoading: loadingTeams,
    } = useTeams();

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),

        defaultValues: {
            team_uuid: "",
            code: "",
            name: "",
            description: "",
            status: "planning",
            start_date: "",
            end_date: "",
            is_active: true,
        },
    });

    useEffect(() => {
        if (!project) return;

        form.reset({
            team_uuid: project.team.uuid,
            code: project.code,
            name: project.name,
            description: project.description ?? "",
            status: project.status,
            start_date: project.start_date ?? "",
            end_date: project.end_date ?? "",
            is_active: project.is_active,
        });
    }, [project, form]);

    const handleSubmit = async (
        values: ProjectFormValues
    ) => {
        if (!project) return;

        await updateProject.mutateAsync({
            uuid: project.uuid,
            payload: values,
        });

        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Project
                    </DialogTitle>

                    <DialogDescription>
                        Update the project information below.
                    </DialogDescription>
                </DialogHeader>

                <ProjectForm
                        form={form}
                        teams={teams}
                        loading={
                            updateProject.isPending ||
                            loadingTeams
                        }
                        onSubmit={handleSubmit}
                    />
            </DialogContent>
        </Dialog>
    );
}