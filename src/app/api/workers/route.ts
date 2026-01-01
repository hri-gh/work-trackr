import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CreateWorkerSchema } from "@/schemas";
import { z } from "zod";

// GET /api/workers - fetch all workers
export async function GET() {
  try {
    const workers = await prisma.worker.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(workers);
  } catch (error) {
    console.error("[WORKER_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST /api/workers - create a new worker
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = CreateWorkerSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: z.treeifyError(validated.error) },
        { status: 400 },
      );
    }

    const worker = await prisma.worker.create({
      data: validated.data,
    });

    return NextResponse.json(worker, { status: 201 });
  } catch (error) {
    console.error("[WORKER_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
