"use client";

import { UseFormReturn } from "react-hook-form";

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

import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";

import { ProjectFormValues } from "../../schemas/project.schema";

interface Team {
    uuid: string;
    name: string;
}

interface ProjectFormProps {
    form: UseFormReturn<ProjectFormValues>;
    teams: Team[];
    loading?: boolean;
    onSubmit: (values: ProjectFormValues) => void;
}

export function ProjectForm({
    form,
    teams,
    loading,
    onSubmit,
}: ProjectFormProps) {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Code */}

                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Project Code
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Enter project code"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Name */}

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Project Name
                            </FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Enter project name"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Team */}

                <FormField
                    control={form.control}
                    name="team_uuid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Team
                            </FormLabel>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a team" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {teams.map((team) => (
                                        <SelectItem
                                            key={team.uuid}
                                            value={team.uuid}
                                        >
                                            {team.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

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
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="planning">
                                        Planning
                                    </SelectItem>

                                    <SelectItem value="active">
                                        Active
                                    </SelectItem>

                                    <SelectItem value="on_hold">
                                        On Hold
                                    </SelectItem>

                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>

                                    <SelectItem value="cancelled">
                                        Cancelled
                                    </SelectItem>
                                </SelectContent>
                            </Select>

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
                                    rows={4}
                                    placeholder="Enter project description"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
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
                                        {...field}
                                        value={field.value ?? ""}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* End Date */}

                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    End Date
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        type="date"
                                        {...field}
                                        value={field.value ?? ""}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Active */}

                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <FormLabel>
                                    Active
                                </FormLabel>

                                <p className="text-sm text-muted-foreground">
                                    Enable or disable this project.
                                </p>
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

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : "Save"}
                </Button>
            </form>
        </Form>
    );
}