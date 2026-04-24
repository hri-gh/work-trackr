import StatCard from "@/components/shared/StatCard";
import { Users, Calendar, IndianRupee } from "lucide-react";


interface WorkerStatsProps {
    totalDays: number;
    totalAmount: number;
    totalRice: number;
    paidDays: number;
    unpaidDays: number;
    paidAmount: number;
    unpaidAmount: number;
}


// component to display worker stats
export default function WorkerStats({ stats }: { stats: WorkerStatsProps }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Days" value={stats.totalDays}
                className="border-l-4 border-l-amber-500"
                icon={<Calendar className="h-4 w-4 text-indigo-500" />}
            />
            <StatCard title="Total Amount" value={stats.totalAmount}
                className="border-l-4 border-l-indigo-500"
                icon={<IndianRupee className="h-4 w-4 text-indigo-500" />}
            />
            <StatCard title="Total Grain (Kg)" value={stats.totalRice}
                className="border-l-4 border-l-green-300"
                icon={<IndianRupee className="h-4 w-4 text-indigo-500" />}
            />
            <StatCard title="Paid Days" value={stats.paidDays}
                className="border-l-4 border-l-blue-500"
                icon={<Calendar className="h-4 w-4 text-indigo-500" />}
            />
            <StatCard title="Unpaid Days" value={stats.unpaidDays}
                className="border-l-4 border-l-red-500"
                icon={<Calendar className="h-4 w-4 text-indigo-500" />}
            />
            <StatCard title="Paid Amount" value={stats.paidAmount}
                className="border-l-4 border-l-green-500"
                icon={<IndianRupee className="h-4 w-4 text-indigo-500" />}
            />
            <StatCard title="Unpaid Amount" value={stats.unpaidAmount}
                className="border-l-4 border-l-red-500"
                icon={<IndianRupee className="h-4 w-4 text-indigo-500" />}
            />
        </div>
    );
}
