export type UserRole = "ADMIN" | "EMPLOYER" | "FREELANCER" | "USER";

/** 0 = rejected, 1 = pending, 2 = approved */
export type UserStatus = 0 | 1 | 2;

export interface User {
  _id: string;
  // `name`/`email` are missing until the user completes their profile
  name?: string;
  email?: string;
  phoneNumber: string;
  biography: string | null;
  avatarUrl: string | null;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  isVerifiedPhoneNumber: boolean;
  createdAt: string;
  updatedAt: string;
}

/** User reference as populated by the backend (`select: { name: 1 }`). */
export type UserRef = Pick<User, "_id" | "name">;

export interface AuthResponse {
  message: string;
  user: User;
}

export interface GetOtpResponse {
  message: string;
  expiresIn: number;
  phoneNumber: string;
  // only sent when OTPs go through Twilio (not in test mode)
  providerStatus?: string;
}

export interface GetOtpPayload {
  phoneNumber: string;
}

export interface CheckOtpPayload {
  phoneNumber: string;
  otp: string;
}

/** Used by both admin and demo login. */
export interface LoginPayload {
  email: string;
  password: string;
}

export interface CompleteProfilePayload {
  name: string;
  email: string;
  role: Extract<UserRole, "EMPLOYER" | "FREELANCER">;
}

export interface EditProfilePayload {
  name: string;
  email: string;
  biography?: string;
  phoneNumber?: string;
}

export interface ChangeUserStatusPayload {
  userId: string;
  // radio inputs send the status as a string; the backend converts it
  status: UserStatus | `${UserStatus}`;
}
