import { auth } from "@/auth";

export interface AuditContext {
    ipAddress: string;
    userAgent: string;
    changedBy: string;
}

export async function getAuditContext(req: Request): Promise<AuditContext> {
    const session = await auth();

    const ipAddress =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip") ||
        "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    const changedBy =
        session?.user?.name ||
        session?.user?.email ||
        "system";

    return {
        ipAddress,
        userAgent,
        changedBy,
    };
}
