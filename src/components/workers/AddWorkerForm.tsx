"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CreateWorkerSchema } from "@/schemas/worker.schema";
import type { CreateWorkerInput } from "@/schemas/worker.schema";

import { createWorker } from "@/lib/api/workers";
import { toast } from "sonner";

interface AddWorkerFormProps {
    onSuccess?: () => void;
}

export const AddWorkerForm = ({ onSuccess }: AddWorkerFormProps) => {
    const form = useForm<CreateWorkerInput>({
        resolver: zodResolver(CreateWorkerSchema),
        defaultValues: {
            name: "",
            mobile: "",
            email: "",
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = form;

    const onSubmit = async (data: CreateWorkerInput) => {
        try {
            await createWorker(data);

            toast.success("Worker added", {
                description: "The worker was created successfully.",
            });

            reset();
            onSuccess?.();
        } catch (error) {
            console.error("[ADD_WORKER_FORM]", error);

            toast.error("Failed to add worker", {
                description: "Something went wrong. Please try again.",

            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                />
                {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                )}
            </Field>

            {/* Mobile */}
            <Field>
                <FieldLabel htmlFor="mobile">Mobile</FieldLabel>
                <Input
                    id="mobile"
                    placeholder="9876543210"
                    {...register("mobile")}
                />
                {errors.mobile && (
                    <FieldError>{errors.mobile.message}</FieldError>
                )}
            </Field>

            {/* Email */}
            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    placeholder="john@example.com"
                    {...register("email")}
                />
                {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                )}
            </Field>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Adding..." : "Add Worker"}
            </Button>
        </form>
    );
};
