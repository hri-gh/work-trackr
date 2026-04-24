import { Skeleton } from "@/components/ui/skeleton";

export function WorkersListSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <Skeleton className="h-4 w-32" />
                </div>
            ))}
        </div>
    );
}
