"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { YearSelector } from "@/components/filters/YearSelector";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { RefreshButton } from "../shared/RefreshButton";

export function WorkersHeader({ year }: { year: number }) {
    const router = useRouter();
    const params = useSearchParams();

    const [isPending, startTransition] = useTransition();

    year = year || new Date().getFullYear();

    const handleChange = (y: number) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("year", String(y));

        router.push(`/workers?${newParams.toString()}`);
    };

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Workers</h1>

            <div className="flex gap-2">
                <RefreshButton />
                <YearSelector value={year} onChange={handleChange} />
            </div>


            {isPending && <Loader2 className="animate-spin" />}
        </div>
    );
}
