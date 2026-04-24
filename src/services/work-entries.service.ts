import { prisma } from "@/lib/db/prisma";
import { AuditContext } from "@/lib/audit/get-audit-context";
import { logEvent } from "@/lib/audit/audit-log";
import { AuditAction, AuditEntity } from "@/lib/audit/audit-types";
import { CreateWorkEntryInput } from "@/schemas/work-entry.schema";


// create a new work entry
export const createWorkEntry = async (data: CreateWorkEntryInput, context: AuditContext) => {
    const { date, amount, grainKg, note, workerIds } = data;

    console.log("Parsed data:", date);
    await prisma.$transaction(
        workerIds.map((workerId) =>
            prisma.workEntry.create({
                data: {
                    workerId,
                    date: new Date(date),
                    amount,
                    grainKg,
                    note,
                },
            })
        )
    );
    // Log the event
    await Promise.all(
        workerIds.map((workerId) =>
            logEvent({
                action: AuditAction.CREATE_WORK_ENTRY,
                entity: AuditEntity.WORK_ENTRY,
                entityId: workerId,
                newValue: { ...data },
                ...context,
            })
        )
    );
}

// mark entries as paid
export const markEntriesPaid = async (entryIds: string[], context: AuditContext, paidAt: Date) => {
    const entries = await prisma.workEntry.findMany({
        where: {
            id: { in: entryIds },
            paid:false,  // only unpaid entries should be marked as paid, if some of the entries are already marked as paid, we can ignore them and mark the rest as paid
        },
    });

    await prisma.workEntry.updateMany({
        where: { id: { in: entryIds } },
        data: {
            paid: true,
            paidAt
        },
    });

    // log the event of data update

    // for (const entry of entries) {
    //     await logEvent({
    //         action: AuditAction.MARK_PAID,
    //         entity: AuditEntity.WORK_ENTRY,
    //         entityId: entry.id,
    //         oldValue: entry,
    //         newValue: { ...entry, paid: true },
    //         ...context
    //     })

    await Promise.all(
        entries.map((entry) =>
            logEvent({
                action: AuditAction.MARK_PAID,
                entity: AuditEntity.WORK_ENTRY,
                entityId: entry.id,
                oldValue: {date:entry.date, paid:entry.paid, paidAt: entry.paidAt},
                newValue: {date: entry.date, paid: true,  paidAt },
                ...context,
            })
        )
    );

    return { count: entryIds.length };
}
