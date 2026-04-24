import { ZodSchema } from "zod";
import { Unprocessable } from "@/lib/errors";

export function zodValidate<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};

        for (const issue of result.error.issues) {
            const field = issue.path.join(".") || "root";

            if (!fieldErrors[field]) {
                fieldErrors[field] = [];
            }

            fieldErrors[field].push(issue.message);
        }

        throw Unprocessable("Validation failed", fieldErrors);
    }

    return result.data;
}



// export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
//     const result = schema.safeParse(data);

//     if (!result.success) {
//         const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[]>;
//         throw Unprocessable("Validation failed", fieldErrors);
//     }

//     return result.data;
// }
