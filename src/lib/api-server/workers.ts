//  # 🔒 server-only data access

import { prisma } from "@/lib/db/prisma";

export async function getWorkers() {
    return prisma.worker.findMany({
        orderBy: { createdAt: "desc" },
    });
}
