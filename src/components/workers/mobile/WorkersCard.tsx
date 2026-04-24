"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Worker {
    id: string;
    name: string;
    mobile?: string | null;
    daysWorked: number;
    totalAmount: number;
    unpaidAmount: number;
}

export function WorkerCard({ workers }: { workers: Worker }) {
    return (

        <div
            className="border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-blue-500/10"
        >
            <Link href={`/workers/${workers.id}`} >
                <div className="flex justify-between items-center ">
                    <h3 className="font-semibold ">{workers.name}</h3>
                    <span className="text-sm text-red-600">
                        {workers.totalAmount && workers.unpaidAmount === 0 ? (
                            <Badge variant="default" className="bg-green-500">All Paid</Badge>
                        ) : (
                            <span className="font-semibold text-orange-500">{workers.unpaidAmount}</span>
                        )}
                    </span>
                </div>

                <p className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {workers.mobile || "No mobile"}
                    </span>
                </p>

                <div className="mt-2 flex justify-between text-sm">
                    <span>Days: {workers.daysWorked}</span>
                    <span className="font-medium">Total: ₹{workers.totalAmount}</span>
                </div>

                {/* <span className="text-blue-500 mt-2 flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                <Link className="" href={`/workers/${workers.id}`}>
                    View Details
                </Link>
                <ArrowRight className="h-4 w-4" />
            </span> */}
            </Link>
        </div>

    );
}
