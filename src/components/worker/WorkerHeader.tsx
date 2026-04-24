"use client";

import { Worker } from "@/generated/prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { RefreshButton } from "../shared/RefreshButton";
import { YearSelector } from "../filters/YearSelector";

import { Card } from "../ui/card";

export default function WorkerHeader({ worker, year }: { worker: Worker, year: number }) {
    const router = useRouter();
    const params = useSearchParams();

    const [isPending, startTransition] = useTransition();

    const handleChange = (y: number) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("year", String(y));

        router.push(`/workers/${worker.id}?${newParams.toString()}`);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    <WorkerProfileCard worker={worker} />
                    {/* <div className=" text-2xl font-semibold text-blue-600">
                        ({year})
                    </div> */}
                </div>


                <div className="flex gap-2">
                    <RefreshButton />
                    <YearSelector value={year} onChange={handleChange} />
                </div>
            </div>
        </>
    );
}

export function WorkerProfileCard({ worker }: { worker: Worker }) {
    return (
        <Card>
            <div className="p-2">
                <h1 className="text-2xl font-semibold">Name: {worker.name}</h1>
                <p className="text-muted-foreground">Mobile: {worker.mobile}</p>
            </div>
        </Card>
    );
}
