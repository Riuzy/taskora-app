import { ClipboardList } from "lucide-react";

export function TaskEmpty() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">
                No Tasks
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
                Create your first task to get started.
            </p>
        </div>
    );
}