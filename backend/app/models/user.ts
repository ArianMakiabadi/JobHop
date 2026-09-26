import mongoose, { type HydratedDocument, type Model } from "mongoose";
import type { Role } from "../../utils/constants";

// 0 rejected, 1 pending, 2 approved
export type UserStatus = 0 | 1 | 2;

export interface IUser {
  name?: string;
  avatar?: string;
  biography: string | null;
  email?: string;
  phoneNumber?: string;
  password?: string;
  otp: {
    code: number;
    expiresIn: Date;
  };
  resetLink: string | null;
  isVerifiedPhoneNumber: boolean;
  isActive: boolean;
  status: UserStatus;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserVirtuals {
  avatarUrl: string | null;
}

// Shape sent by the toJSON override below. Mongoose types `doc.toJSON()` with its own
// Document overload, so this type is only for reference and the override itself.
export type UserJSON = Omit<IUser, "password" | "avatar"> &
  IUserVirtuals & { _id: mongoose.Types.ObjectId };

export type UserModelType = Model<IUser, {}, {}, IUserVirtuals>;

export type UserDocument = HydratedDocument<IUser, IUserVirtuals>;

const UserSchema = new mongoose.Schema<
  IUser,
  UserModelType,
  {},
  {},
  IUserVirtuals
>(
  {
    name: { type: String, trim: true },
    avatar: { type: String },
    biography: { type: String, default: null },
    email: { type: String, lowercase: true, trim: true },
    phoneNumber: { type: String, trim: true },
    password: { type: String },
    otp: {
      code: { type: Number, default: 0 },
      expiresIn: { type: Date, default: 0 },
    },
    resetLink: { type: String, default: null },
    isVerifiedPhoneNumber: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    status: { type: Number, required: true, default: 1, enum: [0, 1, 2] }, // 0, 1, 2
    role: { type: String, default: "EMPLOYER" }, // default role is EMPLOYER
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("avatarUrl").get(function (this: UserDocument) {
  if (this.avatar) return `${process.env.SERVER_URL}/${this.avatar}`;
  return null;
});

UserSchema.methods.toJSON = function (this: UserDocument): UserJSON {
  const { password: _password, avatar: _avatar, ...obj } = this.toObject();
  return { ...obj, avatarUrl: this.avatarUrl };
};

UserSchema.index({
  name: "text",
  email: "text",
  phoneNumber: "text",
  username: "text",
});

export const UserModel = mongoose.model<IUser, UserModelType>("User", UserSchema);
