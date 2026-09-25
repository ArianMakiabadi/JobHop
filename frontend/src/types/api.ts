/** Every successful backend response is wrapped as `{ statusCode, data }`. */
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

/** Error body sent by the backend error handler (use as `AxiosError<ApiError>`). */
export interface ApiError {
  statusCode: number;
  message: string;
}

export interface MessageResponse {
  message: string;
}
