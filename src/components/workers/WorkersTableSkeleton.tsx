import { Skeleton } from "@/components/ui/skeleton";

export function WorkersTableSkeleton() {
    return (
        <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_1fr_auto] px-4 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-500">Name</span>
                <span className="text-sm font-medium text-gray-500">Mobile</span>
                <span className="text-sm font-medium text-gray-500">Actions</span>
            </div>

            {/* Skeleton Rows */}
            {Array.from({ length: 8 }).map((_, index) => (
                <WorkerRowSkeleton key={index} />
            ))}
        </div>
    );
}

function WorkerRowSkeleton() {
    return (
        <div className="grid grid-cols-[1fr_1fr_auto] items-center px-4 py-4 border-b border-gray-100">
            {/* Name column */}
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Mobile column */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-28" />
            </div>

            {/* Actions column */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
            </div>
        </div>
    );
}
