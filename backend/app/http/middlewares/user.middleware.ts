import cookieParser from "cookie-parser";
import createHttpError from "http-errors";
import JWT from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/user";
import { getAuthUser, isTokenPayload } from "../../../utils/functions";

export async function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const accessToken: unknown = req.signedCookies["accessToken"];
    if (!accessToken) {
      throw createHttpError.Unauthorized("Please login to your account!");
    }
    // JWT.verify rejects a missing token ("jwt must be provided"), which ended in this same error
    if (typeof accessToken !== "string") {
      throw createHttpError.Unauthorized("Invalid token!");
    }
    const token = cookieParser.signedCookie(
      accessToken,
      process.env.COOKIE_PARSER_SECRET_KEY!
    );
    if (!token) throw createHttpError.Unauthorized("Invalid token!");
    JWT.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY!,
      async (err, payload) => {
        try {
          if (err) throw createHttpError.Unauthorized("Invalid token!");
          // A payload without an _id used to reach findById(undefined), which finds no user
          if (!isTokenPayload(payload))
            throw createHttpError.Unauthorized("Account not found!");
          const { _id } = payload;
          const user = await UserModel.findById(_id, {
            password: 0,
            otp: 0,
          });
          if (!user) throw createHttpError.Unauthorized("Account not found!");
          req.user = user;
          return next();
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function isVerifiedUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = getAuthUser(req);
    if (user.status === 1) {
      throw createHttpError.Forbidden("Your profile awaiting approval!");
    }
    if (user.status !== 2) {
      throw createHttpError.Forbidden("Your profile is not approved yet!");
    }
    return next();
  } catch (error) {
    next(error);
  }
}

export function decideAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> | void {
  const accessToken: unknown = req.signedCookies["accessToken"];
  if (accessToken) {
    return verifyAccessToken(req, res, next);
  }
  // skip this middleware
  next();
}
