"use client";

import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;

    searchColumn: string;

    searchPlaceholder?: string;

    children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
    table,
    searchColumn,
    searchPlaceholder = "Search...",
    children,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex flex-col gap-4 border-b p-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full max-w-sm">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder={searchPlaceholder}
                    className="pl-10"
                    value={
                        (table
                            .getColumn(searchColumn)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(searchColumn)
                            ?.setFilterValue(event.target.value)
                    }
                />

            </div>

            <div className="flex items-center gap-2">

                {children}

                <DataTableViewOptions table={table} />

            </div>

        </div>
    );
}