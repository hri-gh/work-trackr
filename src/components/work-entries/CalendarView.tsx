import dynamic from "next/dynamic";

const Calendar = dynamic(
    () =>
        import("@/components/ui/calendar")
            .then((mod) => mod.Calendar),
    {
        loading: () => <div>Loading...</div>,
        ssr: false
    }

)

export const CalendarView = () => {

    return (
        <Calendar
            mode="multiple"
            className="rounded-lg border md:[--cell-size:--spacing(12)] lg:[--cell-size:--spacing(16)] p-6"
        />
    );
};


