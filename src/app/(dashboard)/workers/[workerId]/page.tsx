import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getWorkerWithStats } from "@/services/worker.service";
import WorkerHeader from "@/components/worker/WorkerHeader";
import WorkerStats from "@/components/worker/stats/WorkerStats";
import WorkEntriesTable from "@/components/worker/WorkEntriesTable";

export default async function WorkerPage({
    params,
    searchParams,
}: {
    params: Promise<{ workerId: string }>;
    searchParams?: Promise<{ year?: string; page?: string }>;
}) {
    const session = await auth();
    if (!session) redirect("/api/auth/signin");

    const { workerId } = await params;
    const { year, page } = await searchParams || {};

    const y = Number(year) || new Date().getFullYear();
    const p = Number(page) || 1;

    const data = await getWorkerWithStats({
        workerId: workerId,
        year: y,
        page: p,
        limit: 5
    });

    return (
        <div className="space-y-6">
            <WorkerHeader worker={data.worker} year={y} />

            <div className="mb-10">
                <WorkerStats stats={data.stats} />
            </div>

            <WorkEntriesTable
                entries={data.entries}
                pagination={data.pagination}
            />
        </div>
    );
}
