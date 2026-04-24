"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateWorkEntrySchema } from "@/schemas/work-entry.schema";
import type { CreateWorkEntryInput } from "@/schemas/work-entry.schema";
import { createWorkEntry } from "@/lib/api-client/work-entries";
import { useWorkers } from "@/hooks/use-workers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { CalendarIcon, RefreshCw, Plus, Scroll } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { WorkersListSkeleton } from "./WorkersListSkeleton";
import { Spinner } from "../ui/spinner";


interface WorkEntryFormProps {
    defaultDate?: Date;
    onSuccess?: () => void;
}

export function WorkEntryForm({ defaultDate, onSuccess }: WorkEntryFormProps) {

    const { workers, isLoading, mutate } = useWorkers();

    const form = useForm({
        resolver: zodResolver(CreateWorkEntrySchema),
        defaultValues: {
            date: defaultDate
                ? defaultDate.toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
            workerIds: [],
            amount: 0,
            grainKg: 0,
            note: "",
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = form;

    const onSubmit = async (data: CreateWorkEntryInput) => {
        try {
            await createWorkEntry(data);
            // await mutate()
            console.log(data)
            toast.success("Work entry added successfully");
            reset();
            onSuccess?.();
        } catch (error) {
            console.error("Failed to create work entry", error);
            toast.error("Failed to add work entry");
        }
    };

    return (
        <ScrollArea>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

                {/* DATE */}
                <div className="space-y-1">
                    {/* DATE */}
                    <Field>
                        <FieldLabel>Date</FieldLabel>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {form.watch("date")
                                        ? format(new Date(form.watch("date")), "dd-MM-yyyy")
                                        : "Pick a date"}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={
                                        form.watch("date")
                                            ? new Date(form.watch("date"))
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        if (!date) return;

                                        // IMPORTANT: store string, not Date
                                        form.setValue("date", format(date, "yyyy-MM-dd"), {
                                            shouldValidate: true,
                                        });
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        {errors.date && <FieldError>{errors.date.message}</FieldError>}
                    </Field>

                </div>

                {/* WORKERS */}
                <div className="space-y-2">
                    <Field>
                        <FieldLabel>Workers
                            {/* <Button variant="ghost" size="icon-sm" onClick={() => mutate()}>
                            <RefreshCw className=" h-4 w-4" />

                        </Button> */}
                        </FieldLabel>

                        <ScrollArea className="h-40 rounded-md border p-2">
                            {isLoading ? (
                                // <p className="text-sm text-muted-foreground">Loading workers...</p>
                                <WorkersListSkeleton />
                            ) : (
                                workers.map((worker) => {
                                    // if (!workers) {
                                    //     return (<div className="text-sm flex flex-col items-center justify-center text-muted-foreground">
                                    //         No workers found

                                    //         <Link href="/workers">
                                    //             <Button>
                                    //                 <Plus className="mr-2 h-4 w-4" />
                                    //                 Add a Worker
                                    //             </Button>
                                    //         </Link>
                                    //     </div>)
                                    // }
                                    const selected = form.watch("workerIds").includes(worker.id)
                                    return (
                                        <div key={worker.id} className="flex items-center gap-2 py-1">
                                            <Checkbox
                                                // {...register("workerIds")}
                                                checked={selected}
                                                onCheckedChange={(checked) => {
                                                    const current = form.getValues("workerIds");
                                                    setValue(
                                                        "workerIds",
                                                        checked
                                                            ? [...current, worker.id]
                                                            : current.filter((id) => id !== worker.id)
                                                    );
                                                }}
                                            />
                                            <span className="text-sm">{worker.name}</span>
                                        </div>
                                    );
                                })
                            )}
                        </ScrollArea>

                        {errors.workerIds && (
                            <FieldError>{errors.workerIds.message}</FieldError>
                        )}
                    </Field>

                </div>

                {/* AMOUNT */}
                <div className="space-y-1">
                    <Field>
                        <FieldLabel htmlFor="amount">Amount (₹)</FieldLabel>
                        <Input
                            id="amount"
                            type="number"
                            min={0}
                            {...register("amount", { valueAsNumber: true })}
                        />
                        {errors.amount && (
                            <FieldError>{errors.amount.message}</FieldError>
                        )}
                    </Field>

                </div>

                {/* RICE */}
                <div className="space-y-1">
                    <Field>
                        <FieldLabel htmlFor="riceKg">Rice (kg)</FieldLabel>
                        <Input
                            id="grainKg"
                            type="number"
                            step="0.01"
                            min={0}
                            {...register("grainKg", { valueAsNumber: true })}
                        />
                        {errors.grainKg && (
                            <FieldError>{errors.grainKg.message}</FieldError>
                        )}
                    </Field>

                </div>

                {/* NOTE */}
                <div className="space-y-1">
                    <Field>
                        <FieldLabel htmlFor="note">Note</FieldLabel>
                        <Textarea
                            id="note"
                            placeholder="Optional note"
                            {...register("note")}
                        />
                        {errors.note && (
                            <FieldError>{errors.note.message}</FieldError>
                        )}
                    </Field>

                </div>

                {/* SUBMIT */}
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <Spinner /> : "Save Entry"}
                </Button>
            </form>
        </ScrollArea>
    );
}
