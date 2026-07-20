"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

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

import { useUpdateTask } from "../../hooks/use-update-task";

import {
    Task,
    TaskPayload,
} from "../../types/task.type";

interface EditTaskDialogProps {
    projectUuid: string;

    teamUuid: string;

    task: Task;
}

export function EditTaskDialog({
    projectUuid,
    teamUuid,
    task,
}: EditTaskDialogProps) {
    const [open, setOpen] = useState(false);

    const mutation = useUpdateTask();

    const handleSubmit = (payload: TaskPayload) => {
        mutation.mutate(
            {
                projectUuid,
                taskUuid: task.uuid,
                payload,
            },
            {
                onSuccess: () => {
                    toast.success(
                        "Task updated successfully."
                    );

                    setOpen(false);
                },

                onError: () => {
                    toast.error(
                        "Failed to update task."
                    );
                },
            }
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Task
                    </DialogTitle>
                </DialogHeader>

                <TaskForm
                    teamUuid={teamUuid}
                    loading={mutation.isPending}
                    defaultValues={{
                        title: task.title,

                        description:
                            task.description ?? "",

                        status: task.status,

                        priority:
                            task.priority,

                        assignee_id:
                            task.assignee?.id ??
                            null,

                        start_date:
                            task.start_date,

                        due_date:
                            task.due_date,
                    }}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}