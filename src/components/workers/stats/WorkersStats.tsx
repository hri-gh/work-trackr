import StatCard from "@/components/shared/StatCard";
import { Users, Calendar, IndianRupee } from "lucide-react";


// component to display workers stats
export function WorkersStats(
    { totalWorkers, totalAmount, paidAmount, unpaidAmount, totalWorkedDays }: {
        totalWorkers: number,
        totalAmount: number,
        paidAmount: number,
        unpaidAmount: number,
        totalWorkedDays: number
    }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StatCard title="Total Workers" value={totalWorkers}
                icon={<Users className="h-4 w-4 text-indigo-500" />}
                className="border-l-4 border-l-amber-500"
            />
            <StatCard title="Total Worked Days" value={totalWorkedDays}
                icon={<Calendar className="h-4 w-4 text-indigo-500" />}
                className="border-l-4 border-l-blue-300"
            />
            <StatCard title="Total Amount" value={totalAmount}
                icon={<IndianRupee className="h-4 w-4 text-indigo-500" />}
                className="border-l-4 border-l-indigo-500"
            />
            <StatCard title="Total Paid Amount" value={paidAmount}
                icon={<IndianRupee className="h-4 w-4 text-green-500" />}
                className="border-l-4 border-l-green-500"
            />
            <StatCard title="Total Unpaid Amount" value={unpaidAmount}
                icon={<IndianRupee className="h-4 w-4 text-red-500" />}
                className="border-l-4 border-l-red-500"
            />
        </div>
    );

}
