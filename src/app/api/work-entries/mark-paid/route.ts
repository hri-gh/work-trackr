import { MarkPaidSchema } from "@/schemas/work-entry.schema";
import { zodValidate } from "@/utils/zod-validate";
import { getAuditContext } from "@/lib/audit/get-audit-context";
import { markEntriesPaid } from "@/services/work-entries.service";
import { ApiResponse } from "@/lib/api/response";
import { handleError } from "@/lib/errors/handle-error";
import { auth } from "@/auth";
import { Unauthorized, BadRequest } from "@/lib/errors";

export const PATCH = auth((async (req) => {
    try {
        if (!req.auth) throw Unauthorized();

        const body = await req.json();

        const context = await getAuditContext(req);

        const data = zodValidate(MarkPaidSchema, body);

        const paymentDate = new Date()

        if (!paymentDate) throw BadRequest("Payment date is not getting generated");

        const result = await markEntriesPaid(data.entryIds, context, paymentDate);

        return ApiResponse.success(result);
    } catch (error) {
        return handleError(error);
    }
})
);
