import { prisma } from "@/lib/db/prisma";

export async function getDashboardStats(year: number) {
    const start = new Date(Date.UTC(year, 0, 1));
    const end = new Date(Date.UTC(year + 1, 0, 1));

    // 1️⃣ Total workers
    const totalWorkersPromise = prisma.worker.count();

    // 2️⃣ Work entries for the year
    const entriesPromise = prisma.workEntry.findMany({
        where: {
            date: {
                gte: start,
                lt: end,
            },
        },
        select: {
            amount: true,
            paid: true,
            date: true,
        },
    });

    const [totalWorkers, entries] = await Promise.all([
        totalWorkersPromise,
        entriesPromise,
    ]);

    // 3️⃣ Total amount
    const totalAmount = entries.reduce((sum, e) => sum + e.amount, 0);

    // 4️⃣ Paid / Unpaid
    const paidAmount = entries
        .filter((e) => e.paid)
        .reduce((sum, e) => sum + e.amount, 0);

    const unpaidAmount = totalAmount - paidAmount;

    // 5️⃣ Distinct worked days
    const uniqueDays = new Set(
        entries.map((e) => e.date.toISOString().split("T")[0])
    );

    const totalWorkedDays = uniqueDays.size;

    return {
        totalWorkers,
        totalAmount,
        paidAmount,
        unpaidAmount,
        totalWorkedDays,
    };
}
