import http from "./httpService";
import type {
  ApiResponse,
  AuthResponse,
  ChangeUserStatusPayload,
  CheckOtpPayload,
  CompleteProfilePayload,
  EditProfilePayload,
  GetOtpPayload,
  GetOtpResponse,
  LoginPayload,
  MessageResponse,
  User,
} from "../types";

// logout responds without a `data` field
interface LogoutResponse {
  StatusCode: number;
  roles: null;
  auth: boolean;
}

export function getOtp(data: GetOtpPayload): Promise<GetOtpResponse> {
  return http
    .post<ApiResponse<GetOtpResponse>>("/user/get-otp", data)
    .then(({ data }) => data.data);
}

export function checkOtp(data: CheckOtpPayload): Promise<AuthResponse> {
  return http
    .post<ApiResponse<AuthResponse>>("/user/check-otp", data)
    .then(({ data }) => data.data);
}

export function adminLogin(data: LoginPayload): Promise<AuthResponse> {
  return http
    .post<ApiResponse<AuthResponse>>("/user/admin-login", data)
    .then(({ data }) => data.data);
}

export function demoLogin(data: LoginPayload): Promise<AuthResponse> {
  return http
    .post<ApiResponse<AuthResponse>>("/user/demo-login", data)
    .then(({ data }) => data.data);
}

export function completeProfile(
  data: CompleteProfilePayload
): Promise<AuthResponse> {
  return http
    .post<ApiResponse<AuthResponse>>("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export function getUser(): Promise<{ user: User }> {
  return http
    .get<ApiResponse<{ user: User }>>("/user/profile")
    .then(({ data }) => data.data);
}

export function logoutApi(): Promise<void> {
  return http.post<LogoutResponse>("/user/logout").then(() => undefined);
}

export function getUsersApi(): Promise<{ users: User[] }> {
  return http
    .get<ApiResponse<{ users: User[] }>>("/admin/user/list")
    .then(({ data }) => data.data);
}

export function changeUserStatusApi({
  userId,
  ...rest
}: ChangeUserStatusPayload): Promise<MessageResponse> {
  return http
    .patch<ApiResponse<MessageResponse>>(`/admin/user/verify/${userId}`, rest)
    .then(({ data }) => data.data);
}

export function editProfileApi(
  data: EditProfilePayload
): Promise<MessageResponse> {
  return http
    .patch<ApiResponse<MessageResponse>>("/user/update", data)
    .then(({ data }) => data.data);
}
