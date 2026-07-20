"use client";

import { ProjectCardSkeleton } from "../cards/project-card-skeleton";

export function ProjectLoading() {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
            ))}
        </div>
    );
}