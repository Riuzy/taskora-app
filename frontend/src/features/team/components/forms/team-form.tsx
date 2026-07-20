"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
    teamSchema,
    type TeamFormValues,
} from "../../schemas/team.schema";

interface TeamFormProps {
    defaultValues?: TeamFormValues;

    loading?: boolean;

    submitText?: string;

    onSubmit: (values: TeamFormValues) => void;
}

const INITIAL_VALUES: TeamFormValues = {
    name: "",
    description: "",
    is_active: true,
};

export default function TeamForm({
    defaultValues,
    loading = false,
    submitText = "Save Team",
    onSubmit,
}: TeamFormProps) {
    const form = useForm<TeamFormValues>({
        resolver: zodResolver(teamSchema),
        defaultValues: INITIAL_VALUES,
        mode: "onChange",
    });

    useEffect(() => {
        form.reset(defaultValues ?? INITIAL_VALUES);
    }, [defaultValues, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Team Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Team Name
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Development Team"
                                    autoComplete="off"
                                    {...field}
                                />
                            </FormControl>

                            <FormDescription>
                                Enter a unique name for this
                                team.
                            </FormDescription>

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
                                    {...field}
                                    rows={4}
                                    placeholder="Write a short description..."
                                    value={field.value ?? ""}
                                />
                            </FormControl>

                            <FormDescription>
                                This description will help
                                members understand the team's
                                purpose.
                            </FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status */}
                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-xl border p-4">
                            <div className="space-y-1">
                                <FormLabel>
                                    Active Status
                                </FormLabel>

                                <FormDescription>
                                    Active teams can receive
                                    projects and members.
                                </FormDescription>
                            </div>

                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={
                                        field.onChange
                                    }
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="submit"
                        disabled={
                            loading ||
                            !form.formState.isValid
                        }
                    >
                        {loading
                            ? "Saving..."
                            : submitText}
                    </Button>
                </div>
            </form>
        </Form>
    );
}