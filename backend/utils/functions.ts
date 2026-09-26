import createError from "http-errors";
import JWT, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import type { CookieOptions, Request, Response } from "express";
import type { Types } from "mongoose";
import { UserModel, type UserDocument } from "../app/models/user";

/** Payload of the access and refresh tokens created by `generateToken`. */
export interface TokenPayload extends JwtPayload {
  _id: string;
}

export function isTokenPayload(
  payload: string | JwtPayload | undefined
): payload is TokenPayload {
  return typeof payload === "object" && typeof payload._id === "string";
}

export function generateRandomNumber(length: number): number {
  if (length === 5) {
    return Math.floor(10000 + Math.random() * 90000);
  }
  if (length === 6) {
    return Math.floor(100000 + Math.random() * 900000);
  }
  throw new Error(`generateRandomNumber: unsupported length ${length}`);
}

export async function setAccessToken(
  res: Response,
  user: { _id: Types.ObjectId }
): Promise<void> {
  const cookieOptions: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 1, // would expire after 1 days
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    sameSite: "none", // the cookie library lowercases it anyway: SameSite=None
    secure: process.env.NODE_ENV === "development" ? false : true,
    domain: process.env.DOMAIN,
  };
  res.cookie(
    "accessToken",
    await generateToken(user, "1d", process.env.ACCESS_TOKEN_SECRET_KEY),
    cookieOptions
  );
}

export async function setRefreshToken(
  res: Response,
  user: { _id: Types.ObjectId }
): Promise<void> {
  const cookieOptions: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 365, // would expire after 1 year
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    sameSite: "lax", // the cookie library lowercases it anyway: SameSite=Lax
    secure: process.env.NODE_ENV === "development" ? false : true,
    domain: process.env.DOMAIN,
  };
  res.cookie(
    "refreshToken",
    await generateToken(user, "1y", process.env.REFRESH_TOKEN_SECRET_KEY),
    cookieOptions
  );
}

function generateToken(
  user: { _id: Types.ObjectId },
  expiresIn: NonNullable<SignOptions["expiresIn"]>,
  secret: string | undefined
): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: user._id,
    };

    const options = {
      expiresIn,
    };

    const key = secret || process.env.TOKEN_SECRET_KEY;
    // JWT.sign reports a missing key through the callback error, which rejected with this same error
    if (!key) return reject(createError.InternalServerError("Internal server error"));

    JWT.sign(payload, key, options, (err, token) => {
      if (err || !token)
        return reject(createError.InternalServerError("Internal server error"));
      resolve(token);
    });
  });
}

export function verifyRefreshToken(req: Request): Promise<string> {
  const refreshToken: unknown = req.signedCookies["refreshToken"];
  if (!refreshToken || typeof refreshToken !== "string") {
    throw createError.Unauthorized("Please sign in to continue.");
  }
  const token = cookieParser.signedCookie(
    refreshToken,
    process.env.COOKIE_PARSER_SECRET_KEY!
  );
  return new Promise((resolve, reject) => {
    // JWT.verify rejects an empty token through the callback, which rejected with this same error
    if (!token) return reject(createError.Unauthorized("Please sign in to continue."));
    JWT.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY!,
      async (err, payload) => {
        try {
          if (err)
            return reject(createError.Unauthorized("Please sign in to continue."));
          // A payload without an _id used to reach findById(undefined), which finds no user
          if (!isTokenPayload(payload))
            return reject(createError.Unauthorized("User account not found."));
          const { _id } = payload;
          const user = await UserModel.findById(_id, {
            password: 0,
            otp: 0,
            resetLink: 0,
          });
          if (!user)
            return reject(createError.Unauthorized("User account not found."));
          return resolve(_id);
        } catch {
          reject(createError.Unauthorized("User account not found."));
        }
      }
    );
  });
}

/** Deep copy through JSON. The caller names the resulting (JSON) shape, e.g. ObjectIds become strings. */
export function copyObject<T>(object: unknown): T {
  return JSON.parse(JSON.stringify(object));
}

/** The user set by `verifyAccessToken`. Use it in handlers that run behind that middleware. */
export function getAuthUser(req: Request): UserDocument {
  if (!req.user) throw createError.Unauthorized("Please login to your account!");
  return req.user;
}
