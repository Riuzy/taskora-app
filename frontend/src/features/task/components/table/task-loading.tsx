import { Skeleton } from "@/components/ui/skeleton";

export function TaskLoading() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-14 w-full"
                />
            ))}
        </div>
    );
}