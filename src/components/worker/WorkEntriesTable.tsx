"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { WorkEntry } from "@/generated/prisma/client";
import { Pagination } from "../shared/Pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils";
import { Card, CardTitle, CardHeader } from "../ui/card";
import { updatePaidStatus } from "@/lib/api-client/work-entries";
import { Spinner } from "../ui/spinner";


export default function WorkerEntriesTable({ entries, pagination }: { entries: WorkEntry[], pagination: { page: number, totalPages: number } }) {
    const router = useRouter();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);


    const handleMarkPaid = async () => {
        try {
            setIsUpdating(true);

            await updatePaidStatus(selectedIds);

            toast.success("Marked as paid");

            setSelectedIds([]);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update");
        } finally {
            setIsUpdating(false);
        }
    };
    return (
        <>
            <Card className="p-4">
                <div className="space-y-4">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Work History</CardTitle>
                            {selectedIds.length > 0 && (
                                //     <p className="text-sm text-muted-foreground space-y-0">
                                //     {selectedIds.length} entry{selectedIds.length > 1 ? 'ies' : 'y'} selected
                                // </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-green-600 gap-2 hover:bg-green-700 text-white"
                                    onClick={handleMarkPaid}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    {isUpdating ? <Spinner className="h-4 w-4" /> : `Mark as Paid (${selectedIds.length})`}
                                </Button>

                            )}
                        </div>

                    </CardHeader>

                    <div className="rounded-md border overflow-hidden">
                        <Table className="">
                            <TableHeader className="border-b bg-muted/50">
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            className="border border-gray-800"
                                            checked={selectedIds.length === entries.length}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setSelectedIds(entries.map((e) => e.id));
                                                } else {
                                                    setSelectedIds([]);
                                                }
                                            }}
                                        />
                                    </TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Grain (Kg)</TableHead>
                                    <TableHead>Paid At</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                    {/* <TableHead className="flex items-center justify-center">Action</TableHead> */}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {entries.map(entry => {
                                    const isPaid = entry.paid;

                                    return (
                                        <TableRow key={entry.id}>
                                            <TableCell>
                                                <Checkbox
                                                    className="border border-gray-500"
                                                    checked={selectedIds.includes(entry.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedIds([...selectedIds, entry.id]);
                                                        } else {
                                                            setSelectedIds(selectedIds.filter((id) => id !== entry.id));
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell className={cn(
                            "font-medium",
                            isPaid && "line-through text-slate-400 dark:text-slate-600"
                          )}>
                                                {/* {entry.date.toISOString().split('T')[0]} */}
                                                {new Date(entry.date).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    weekday: "short",
                                                })}
                                            </TableCell>

                                            <TableCell className={cn(
                            isPaid && "line-through text-slate-400 dark:text-slate-600"
                          )}>
                                                ₹{entry.amount}
                                            </TableCell>

                                            <TableCell className={cn(
                                                isPaid && "line-through text-slate-400 dark:text-slate-600"
                                            )}>
                                                {entry.grainKg} kg
                                            </TableCell>

                                            <TableCell className={cn(
                            isPaid && "line-through text-slate-400 dark:text-slate-600"
                          )}>
                                                {entry.paidAt ? new Date(entry.paidAt).toLocaleDateString("en-IN") : "Not Paid"}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        entry.paid
                                                            ? "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30"
                                                            : "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30"
                                                    )}
                                                >
                                                    {entry.paid ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                                    {entry.paid ? "Paid" : "Unpaid"}

                                                </Badge>
                                            </TableCell>
                                            {/* <TableCell className="flex items-center justify-center">
                                        <Ellipsis className="h-4 w-4" />
                                    </TableCell> */}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                    </div>
                    <Pagination page={pagination.page} totalPages={pagination.totalPages} />
                </div>
            </Card>
        </>
    );
}
