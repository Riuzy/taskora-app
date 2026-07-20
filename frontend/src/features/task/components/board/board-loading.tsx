"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function BoardLoading() {
    return (
        <div className="flex gap-6 overflow-hidden">

            {Array.from({
                length: 4,
            }).map((_, index) => (
                <div
                    key={index}
                    className="w-[360px] shrink-0 rounded-2xl border bg-background p-5 space-y-5"
                >
                    <Skeleton className="h-6 w-28" />

                    <Skeleton className="h-12 w-full" />

                    <Skeleton className="h-48 w-full rounded-xl" />

                    <Skeleton className="h-48 w-full rounded-xl" />
                </div>
            ))}

        </div>
    );
}