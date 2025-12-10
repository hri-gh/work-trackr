import {db} from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


// GET /api/workers - fetch all workers
export async function GET() {
  try {
    const workers = await db.worker.findMany({
      include: { workEntries: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(workers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch workers" }, { status: 500 });
  }
}

// POST /api/workers - create a new worker
export async function POST(req: NextRequest) {
  try {
    const { name, mobile, email } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const worker = await db.worker.create({
      data: { name, mobile, email },
    });
    return NextResponse.json(worker, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create worker" }, { status: 500 });
  }
}
