"use client"

import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { useWorkEntryModalStore } from "@/store/work-entry-modal.store";

export function MarkWorkDayButton() {
    const openWorkEntryModal = useWorkEntryModalStore((state) => state.openModal);

    return (
        <>
            <Button
                variant="outline"
                className="hidden sm:flex border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={openWorkEntryModal}
            >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Mark Work Day
            </Button>

            {/* Mobile Icon Only Buttons */}
            <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={openWorkEntryModal}
            >
                <CalendarPlus className="h-5 w-5" />
            </Button>
        </>
    )
}
