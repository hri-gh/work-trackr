"use client";

import { useTransition } from "react";
import { WorkersTable } from "./WorkersTable";
import { WorkersCardList } from "./mobile/WorkersCardList";
import { WorkersTableSkeleton } from "./WorkersTableSkeleton";


interface Worker {
    id: string;
    name: string;
    mobile?: string | null;
    daysWorked: number;
    totalAmount: number;
    unpaidAmount: number;
}

export function WorkersList({ workers }: { workers: Worker[] }) {
    const [isPending] = useTransition();

    return (
        <div className="relative">
            {/* Actual Content */}
            <div className={isPending ? "opacity-50" : ""}>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <WorkersTable workers={workers} />
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    <WorkersCardList workers={workers} />
                </div>
            </div>

            {/* Overlay Skeleton */}
            {isPending && (
                <div className="absolute inset-0">
                    <WorkersTableSkeleton />
                </div>
            )}
        </div>
    );
}
