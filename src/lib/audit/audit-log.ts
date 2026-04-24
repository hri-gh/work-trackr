import { prisma } from "@/lib/db/prisma";
import { AuditAction, AuditEntity } from "./audit-types";

interface LogEventParams {
    action: AuditAction;
    entity: AuditEntity;
    entityId: string;
    oldValue?: any;
    newValue?: any
    ipAddress?: string;
    userAgent?: string;
    changedBy?: string;
}

export async function logEvent({
    action,
    entity,
    entityId,
    oldValue = null,
    newValue = null,
    ipAddress,
    userAgent,
    changedBy,
}: LogEventParams) {
    try {
        await prisma.auditLog.create({
            data: {
                action,
                entity,
                entityId,
                oldValue,
                newValue,
                ipAddress,
                userAgent,
                changedBy
            },
        });
    } catch (error) {
        // ❗ Never break main flow because of logging
        console.error("[AUDIT_LOG_FAILED]", error);
    }
}
