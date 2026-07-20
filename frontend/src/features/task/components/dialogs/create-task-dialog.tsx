"use client";

import { useState, ReactNode } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { TaskForm } from "../forms/task-form";

import { useCreateTask } from "../../hooks/use-create-task";

import { TaskPayload } from "../../types/task.type";

interface CreateTaskDialogProps {
    projectUuid: string;
    teamUuid: string;
    children?: ReactNode;
}

export function CreateTaskDialog({
    projectUuid,
    teamUuid,
    children,
}: CreateTaskDialogProps) {
    const [open, setOpen] = useState(false);

    const mutation = useCreateTask();

    const handleSubmit = (payload: TaskPayload) => {
        mutation.mutate(
            {
                projectUuid,
                payload,
            },
            {
                onSuccess: () => {
                    toast.success("Task created successfully.");
                    setOpen(false);
                },
                onError: () => {
                    toast.error("Failed to create task.");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ?? (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Task
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <TaskForm
                    teamUuid={teamUuid}
                    loading={mutation.isPending}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}