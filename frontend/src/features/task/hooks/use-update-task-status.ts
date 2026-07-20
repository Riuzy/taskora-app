"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTaskStatus } from "../api/task.api";
import { taskKeys } from "./task.keys";
import { Task, TaskStatus } from "../types/task.type";

interface UpdateTaskStatusInput {
    taskUuid: string;
    status: TaskStatus;
}

export function useUpdateTaskStatus(projectUuid: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            taskUuid,
            status,
        }: UpdateTaskStatusInput) =>
            updateTaskStatus(projectUuid, taskUuid, {
                status,
            }),

        onMutate: async ({
            taskUuid,
            status,
        }) => {

            await queryClient.cancelQueries({
                queryKey: taskKeys.list(projectUuid),
            });

            const previousTasks =
                queryClient.getQueryData<Task[]>(
                    taskKeys.list(projectUuid)
                );

            queryClient.setQueryData<Task[]>(
                taskKeys.list(projectUuid),
                (old = []) =>
                    old.map((task) =>
                        task.uuid === taskUuid
                            ? {
                                  ...task,
                                  status,
                              }
                            : task
                    )
            );

            return {
                previousTasks,
            };
        },

        onError: (
            _,
            __,
            context
        ) => {

            if (
                context?.previousTasks
            ) {
                queryClient.setQueryData(
                    taskKeys.list(projectUuid),
                    context.previousTasks
                );
            }

        },

        onSettled: () => {

            queryClient.invalidateQueries({
                queryKey: taskKeys.list(projectUuid),
            });

        },
    });
}