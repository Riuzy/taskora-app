"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Task } from "../../types/task.type";
import { useDeleteTask } from "../../hooks/use-delete-task";

interface DeleteTaskDialogProps {
    projectUuid: string;
    task: Task;
}

export function DeleteTaskDialog({
    projectUuid,
    task,
}: DeleteTaskDialogProps) {
    const mutation = useDeleteTask();

    const handleDelete = async () => {
        try {
            await mutation.mutateAsync({
                projectUuid,
                taskUuid: task.uuid,
            });

            toast.success("Task deleted successfully.");
        } catch {
            toast.error("Failed to delete task.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Task
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone.
                        The task{" "}
                        <strong>{task.title}</strong>{" "}
                        will be permanently deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={mutation.isPending}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}