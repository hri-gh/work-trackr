import { ApiError } from "./api-error";

export const BadRequest = (msg = "Bad Request", errors?: any) =>
    new ApiError(400, msg, errors);

export const Unauthorized = (msg = "Unauthorized") =>
    new ApiError(401, msg);

export const NotFound = (msg = "Not Found") =>
    new ApiError(404, msg);

export const Forbidden = (msg = "Forbidden") =>
    new ApiError(403, msg);

export const Conflict = (msg = "Conflict") =>
    new ApiError(409, msg);

export const Unprocessable = (msg = "Unprocessable Entity", errors?: any) =>
    new ApiError(422, msg, errors);

export const Internal = (msg = "Internal Server Error") =>
    new ApiError(500, msg);
