// src/services/worker.service.ts
import { prisma } from "@/lib/db/prisma"
import type { CreateWorkerInput, UpdateWorkerInput } from "@/schemas/worker.schema"
import { NotFound } from "@/lib/errors";
import { AuditContext } from "@/lib/audit/get-audit-context";
import { logEvent } from "@/lib/audit/audit-log";
import { AuditAction, AuditEntity } from "@/lib/audit/audit-types";

export const getWorkers = async () => {
    return prisma.worker.findMany({
        orderBy: { createdAt: "desc" }
    })
}

export const getWorkerById = async (id: string) => {
    const worker = await prisma.worker.findUnique({ where: { id } })
    if (!worker) throw NotFound("Worker not found")
    return worker
}

export const createWorker = async (data: CreateWorkerInput, context: AuditContext) => {
    const worker = await prisma.worker.create({ data })

    // log the event of data creation
    await logEvent({
        action: AuditAction.CREATE_WORKER,
        entity: AuditEntity.WORKER,
        entityId: worker.id,
        newValue: worker,
        ...context
    })

    return worker
}

export const deleteWorker = async (id: string) => {
    const worker = await getWorkerById(id) // reuse, throws 404 if not found
    if (!worker) throw NotFound("Worker not found");

    return prisma.worker.delete({ where: { id } })
}


export const updateWorker = async (id: string, data: UpdateWorkerInput) => {
    const worker = await getWorkerById(id)
    if (!worker) throw NotFound("Worker not found");

    return prisma.worker.update({ where: { id }, data });
}


export const getWorkersWithStats = async ({
    year,
    page = 1,
    limit = 10
}: {
    year: number,
    page?: number,
    limit?: number
}) => {
    const start = new Date(Date.UTC(year, 0, 1));
    const end = new Date(Date.UTC(year + 1, 0, 1));

    const skip = (page - 1) * limit;

    const totalWorkers = await prisma.worker.count();

    // const PAGE_SIZE = 5;
    // const skip = (page - 1) * PAGE_SIZE;


    const workers = await prisma.worker.findMany({
        take: limit,
        skip,
        include: {
            workEntries: {
                where: {
                    date: {
                        gte: start,
                        lt: end,
                    },
                },
                select: {
                    amount: true,
                    paid: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedWorkers = workers.map((w) => {
        const totalAmount = w.workEntries.reduce(
            (sum, e) => sum + e.amount,
            0
        );

        const unpaidAmount = w.workEntries
            .filter((e) => !e.paid)
            .reduce((sum, e) => sum + e.amount, 0);

        return {
            id: w.id,
            name: w.name,
            mobile: w.mobile,
            daysWorked: w.workEntries.length,
            totalAmount,
            unpaidAmount,
        };
    });

    return {
        workers: formattedWorkers,
        pagination: {
            total: totalWorkers,
            page,
            limit,
            totalPages: Math.ceil(totalWorkers / limit),
        },
    };
}


export async function getWorkerWithStats({
    workerId,
    year,
    page = 1,
    limit = 10,
}: {
    workerId: string;
    year: number;
    page?: number;
    limit?: number;
}) {
    const start = new Date(Date.UTC(year, 0, 1));
    const end = new Date(Date.UTC(year + 1, 0, 1));

    const skip = (page - 1) * limit;

    // 1. Worker info
    const worker = await prisma.worker.findUnique({
        where: { id: workerId },
    });

    if (!worker) throw new Error("Worker not found");

    // 2. Stats (single query)
    const stats = await prisma.workEntry.aggregate({
        where: {
            workerId,
            date: {
                gte: start,
                lt: end,
            },
        },
        _sum: {
            amount: true,
            grainKg: true,
        },
        _count: {
            id: true,
        },
    });

    // 3. Paid vs Unpaid split
    const [paidStats, unpaidStats] = await Promise.all([
        prisma.workEntry.aggregate({
            where: {
                workerId,
                paid: true,
                date: { gte: start, lt: end },
            },
            _sum: { amount: true },
            _count: { id: true },
        }),
        prisma.workEntry.aggregate({
            where: {
                workerId,
                paid: false,
                date: { gte: start, lt: end },
            },
            _sum: { amount: true },
            _count: { id: true },
        }),
    ]);

    // 4. Entries (paginated)
    const entries = await prisma.workEntry.findMany({
        where: {
            workerId,
            date: {
                gte: start,
                lt: end,
            },
        },
        orderBy: {
            date: "desc",
        },
        skip,
        take: limit,
    });

    const totalEntries = await prisma.workEntry.count({
        where: {
            workerId,
            date: { gte: start, lt: end },
        },
    });

    return {
        worker,

        stats: {
            totalDays: stats._count.id || 0,
            totalAmount: stats._sum.amount || 0,
            totalGrain: stats._sum.grainKg || 0,

            paidDays: paidStats._count.id || 0,
            unpaidDays: unpaidStats._count.id || 0,

            paidAmount: paidStats._sum.amount || 0,
            unpaidAmount: unpaidStats._sum.amount || 0,
        },

        entries,
        pagination: {
            total: totalEntries,
            page,
            limit,
            totalPages: Math.ceil(totalEntries / limit),
        },
    };
}
