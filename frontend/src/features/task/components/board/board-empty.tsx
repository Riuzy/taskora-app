"use client";

import { ClipboardList } from "lucide-react";

export function BoardEmpty() {
    return (
        <div className="flex h-full flex-col items-center justify-center text-center">

            <ClipboardList className="mb-3 h-10 w-10 text-muted-foreground" />

            <p className="font-medium">
                No tasks yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
                Create a new task to get started
            </p>

        </div>
    );
}