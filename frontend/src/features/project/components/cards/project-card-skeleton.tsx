"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProjectCardSkeleton() {
    return (
        <div className="rounded-xl border p-6 space-y-4">
            <Skeleton className="h-12 w-12 rounded-xl" />

            <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-12 w-full" />

            <Skeleton className="h-6 w-20 rounded-full" />

            <Skeleton className="h-4 w-40" />

            <Skeleton className="h-4 w-52" />
        </div>
    );
}