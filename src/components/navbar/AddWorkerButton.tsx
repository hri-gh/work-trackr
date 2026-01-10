"use client"

import { useAddWorkerModalStore } from "@/store/add-worker-modal.store";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function AddWorkerButton() {
    const openAddWorkerModal = useAddWorkerModalStore((state) => state.openModal);

    return (
        <>
            <Button
                variant="default"
                className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={openAddWorkerModal}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Worker
            </Button>

            {/* Mobile Icon Only Buttons */}
            <Button
                variant="ghost"
                size="icon"
                onClick={openAddWorkerModal}
                className="sm:hidden"
            >
                <PlusCircle className="h-5 w-5" />
            </Button>
        </>
    )
}
