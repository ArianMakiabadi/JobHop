import { isAxiosError } from "axios";
import type { ApiError } from "../types";

/** Backend error message from a caught error, with the same fallback the query hooks use. */
export default function getErrorMessage(error: unknown): string {
  const message = isAxiosError<ApiError>(error)
    ? error.response?.data?.message
    : undefined;
  return message ?? "Something went wrong";
}
