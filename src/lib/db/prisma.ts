import { PrismaClient } from "@/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
// import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

