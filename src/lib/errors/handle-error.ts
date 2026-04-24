import { ApiError } from "./api-error";
import { ApiResponse } from "../api/response";

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return ApiResponse.error(
      error.message,
      error.statusCode,
      error.errors
    );
  }

  return ApiResponse.error("Internal Server Error", 500);
}
