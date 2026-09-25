import "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./api";

// Every query/mutation error comes from axios, so `onError` / `error` are typed globally.
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}
