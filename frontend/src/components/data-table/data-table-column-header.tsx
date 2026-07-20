"use client";

import { Column } from "@tanstack/react-table";

import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props<TData, TValue> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
}: Props<TData, TValue>) {

    if (!column.getCanSort()) {
        return (
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
            </span>
        );
    }

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <Button
                    variant="ghost"
                    className="h-8 px-2 hover:bg-transparent"
                >

                    <span className="text-xs font-semibold uppercase tracking-wider">

                        {title}

                    </span>

                    {column.getIsSorted() === "desc" ? (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4 opacity-60" />
                    )}

                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">

                <DropdownMenuItem
                    onClick={() => column.toggleSorting(false)}
                >
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Ascending
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => column.toggleSorting(true)}
                >
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Descending
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => column.toggleVisibility(false)}
                >
                    <EyeOff className="mr-2 h-4 w-4" />
                    Hide Column
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}