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

import { useCreateProject } from "../../hooks/use-create-project";
import { useTeams } from "@/features/team/hooks/use-teams";

interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({
    open,
    onOpenChange,
}: CreateProjectDialogProps) {
    const createProject = useCreateProject();

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
        if (open) {
            form.reset();
        }
    }, [open, form]);

    async function handleSubmit(
        values: ProjectFormValues
    ) {
        await createProject.mutateAsync(values);

        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Create Project
                    </DialogTitle>

                    <DialogDescription>
                        Fill in the information below to create a new project.
                    </DialogDescription>
                </DialogHeader>

                <ProjectForm
                    form={form}
                    teams={teams}
                    loading={
                        loadingTeams ||
                        createProject.isPending
                    }
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}