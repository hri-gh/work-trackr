"use client"

import { CalendarView } from "@/components/work-entries/CalendarView";

export default function CalendarPage() {


    return (
        <>
            <h1 className="text-2xl font-bold">Calender</h1>
            <p className="text-muted-foreground">Upcoming: Work Entries of the Current Month</p>
            <div className="mt-4 items-center justify-center flex">
                <CalendarView />
            </div>
        </>
    )
}
