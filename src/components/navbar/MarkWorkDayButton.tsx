"use client"

import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

export function MarkWorkDayButton() {

    return (
        <>
            <Button
                variant="outline"
                className="hidden sm:flex border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => { }}
            >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Mark Work Day
            </Button>

            {/* Mobile Icon Only Buttons */}
            <Button variant="ghost" size="icon" className="sm:hidden">
                <CalendarPlus className="h-5 w-5" />
            </Button>
        </>
    )
}
