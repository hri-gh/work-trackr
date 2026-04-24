import { auth } from "@/auth";
import { getWorkersWithStats } from "@/services/worker.service";
import { WorkersHeader } from "@/components/workers/WorkersHeader";
import { Pagination } from "@/components/shared/Pagination";
import { WorkersList } from "@/components/workers/WorkersList";
import { WorkersStats } from "@/components/workers/stats/WorkersStats";
import { getDashboardStats } from "@/services/dashboard.service";


export default async function WorkersPage({
    searchParams
}: {
    searchParams?: Promise<{ year?: string; page?: string }>
}) {
    const session = await auth();
    if (!session) return null;

    const { year, page } = await searchParams || {};

    const y = year ? Number(year) : new Date().getFullYear();
    const p = page ? Number(page) : 1;

    const stats = await getDashboardStats(y);
    const data = await getWorkersWithStats(
        {
            year: y,
            page: p,
            limit: 5
        }
    );

    return (
        <div className="space-y-6">
            <WorkersHeader year={y} />
            <WorkersStats {...stats} />

            <WorkersList workers={data.workers} />
            <Pagination page={data.pagination.page} totalPages={data.pagination.totalPages} />
        </div>
    )
}
