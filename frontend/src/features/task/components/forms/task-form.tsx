"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useTeamMembers } from "@/features/team/hooks/use-team-members";

import { TaskPayload } from "../../types/task.type";

import {
    taskSchema,
    TaskFormValues,
} from "../../schemas/task.schema";

interface TaskFormProps {
    teamUuid: string;

    defaultValues?: Partial<TaskPayload>;

    loading?: boolean;

    onSubmit: (
        values: TaskPayload
    ) => void;
}

export function TaskForm({
    teamUuid,
    defaultValues,
    loading,
    onSubmit,
}: TaskFormProps) {
    const { data: members = [] } =
        useTeamMembers(teamUuid);

    console.log("TEAM UUID", teamUuid);
    console.log("MEMBERS", members);

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),

        defaultValues: {
            title: "",

            description: "",

            status: "todo",

            priority: "medium",

            assignee_id: null,

            start_date: null,

            due_date: null,

            ...defaultValues,
        },
    });

    useEffect(() => {
        form.reset({
            title: "",

            description: "",

            status: "todo",

            priority: "medium",

            assignee_id: null,

            start_date: null,

            due_date: null,

            ...defaultValues,
        });
    }, [defaultValues, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Title */}

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Title
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Task title"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description
                            </FormLabel>

                            <FormControl>
                                <Textarea
                                    rows={5}
                                    placeholder="Task description"
                                    {...field}
                                    value={
                                        field.value ??
                                        ""
                                    }
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status */}

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Status
                            </FormLabel>

                            <Select
                                value={field.value}
                                onValueChange={
                                    field.onChange
                                }
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="todo">
                                        Todo
                                    </SelectItem>

                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>

                                    <SelectItem value="review">
                                        Review
                                    </SelectItem>

                                    <SelectItem value="done">
                                        Done
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Priority */}

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Priority
                            </FormLabel>

                            <Select
                                value={field.value}
                                onValueChange={
                                    field.onChange
                                }
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="low">
                                        Low
                                    </SelectItem>

                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>

                                    <SelectItem value="high">
                                        High
                                    </SelectItem>

                                    <SelectItem value="critical">
                                        Critical
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Assignee */}

                <FormField
                    control={form.control}
                    name="assignee_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Assignee
                            </FormLabel>

                            <Select
                                value={
                                    field.value
                                        ? String(
                                              field.value
                                          )
                                        : "none"
                                }
                                onValueChange={(
                                    value
                                ) =>
                                    field.onChange(
                                        value ===
                                            "none"
                                            ? null
                                            : Number(
                                                  value
                                              )
                                    )
                                }
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="none">
                                        Unassigned
                                    </SelectItem>

                                    {members.map(
                                        (
                                            member
                                        ) => (
                                            <SelectItem
                                                key={member.id}
                                                value={String(member.id)}
                                            >
                                                {member.name}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Start Date */}

                <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Start Date
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="date"
                                    value={
                                        field.value ??
                                        ""
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        field.onChange(
                                            e.target
                                                .value ||
                                                null
                                        )
                                    }
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Due Date */}

                <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Due Date
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="date"
                                    value={
                                        field.value ??
                                        ""
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        field.onChange(
                                            e.target
                                                .value ||
                                                null
                                        )
                                    }
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    Save
                </Button>
            </form>
        </Form>
    );
}