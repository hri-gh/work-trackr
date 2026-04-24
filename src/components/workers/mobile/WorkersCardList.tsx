"use client";

import { WorkerCard } from "./WorkersCard";

interface Worker {
    id: string;
    name: string;
    mobile?: string | null;
    daysWorked: number;
    totalAmount: number;
    unpaidAmount: number;
}

export function WorkersCardList({ workers }: { workers: Worker[] }) {
    return (
        <div className="space-y-3 border-2 border-muted rounded-md">
            {workers.length === 0 ? (
                <div className="flex items-center justify-center h-28">
                    <p className="font-mono font-semibold text-muted-foreground">No workers found</p>
                </div>
            ) : (
                workers.map((w) => (
                    <WorkerCard key={w.id} workers={w} />
                ))
            )}
        </div>
    );
}
