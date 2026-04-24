import { MarkPaidSchema } from "@/schemas/work-entry.schema";
import { zodValidate } from "@/utils/zod-validate";
import { getAuditContext } from "@/lib/audit/get-audit-context";
import { markEntriesPaid } from "@/services/work-entries.service";
import { ApiResponse } from "@/lib/api/response";
import { handleError } from "@/lib/errors/handle-error";
import { auth } from "@/auth";
import { Unauthorized } from "@/lib/errors";

export const PATCH = auth((async (req) => {
    try {
        if (!req.auth) throw Unauthorized();

        const body = await req.json();

        const context = await getAuditContext(req);

        const data = zodValidate(MarkPaidSchema, body);

        const paidAt = data.paymentDate ? new Date(data.paymentDate) : new Date();

        const result = await markEntriesPaid(data.entryIds, context, paidAt);

        return ApiResponse.success(result);
    } catch (error) {
        return handleError(error);
    }
})
);
