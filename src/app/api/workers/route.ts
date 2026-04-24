import { CreateWorkerSchema } from "@/schemas";
import { auth } from "@/auth";
import { getAuditContext } from "@/lib/audit/get-audit-context";
import { ApiResponse } from "@/lib/api/response";
import { getWorkers, createWorker } from "@/services/worker.service";
import { Unauthorized } from "@/lib/errors";
import { handleError } from "@/lib/errors/handle-error";
import { zodValidate } from "@/utils/zod-validate";

// GET /api/workers - fetch all workers
export const GET = auth(async (req) => {
  try {
    if (!req.auth) throw Unauthorized();
    const workers = await getWorkers();
    return ApiResponse.success(workers);
  } catch (error) {
    return handleError(error);
  }
});

// POST /api/workers - create } } a new worker
export const POST = auth(async (req) => {
  try {
    if (!req.auth) throw Unauthorized();
    const body = await req.json();
    const context = await getAuditContext(req);
    const data = zodValidate(CreateWorkerSchema, body);
    const worker = await createWorker(data, context);
    return ApiResponse.created(worker);
  } catch (error) {
    return handleError(error);
  }
});
