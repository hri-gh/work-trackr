import { CreateWorkEntrySchema } from "@/schemas/work-entry.schema";
import { Unauthorized } from "@/lib/errors";
import { handleError } from "@/lib/errors/handle-error";
import { zodValidate } from "@/utils/zod-validate";
import { auth } from "@/auth";
import { getAuditContext } from "@/lib/audit/get-audit-context";
import { ApiResponse } from "@/lib/api/response";
import { createWorkEntry } from "@/services/work-entries.service";


// POST /api/work-entries - create a new work entry
export const POST = auth((async (req) => {
    try {
        if (!req.auth) throw Unauthorized();

        const body = await req.json();

        const context = await getAuditContext(req);

        const data = zodValidate(CreateWorkEntrySchema, body);

        const workEntry = await createWorkEntry(data, context);

        return ApiResponse.created(workEntry);
    } catch (error) {
        return handleError(error);
    }
}));

