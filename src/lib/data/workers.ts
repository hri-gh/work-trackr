//  # 🔒 server-only data access

import { prisma } from "@/lib/prisma";

export async function getWorkers() {
    return prisma.worker.findMany({
        orderBy: { createdAt: "desc" },
    });
}
