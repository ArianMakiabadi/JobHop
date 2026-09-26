import createError from "http-errors";
import type { RequestHandler } from "express";
import { UserModel } from "../../models/user";
import type { Role } from "../../../utils/constants";
import { getAuthUser } from "../../../utils/functions";

export function authorize(...allowedRoles: Role[]): RequestHandler {
  return async function (req, res, next) {
    try {
      const userId = getAuthUser(req)._id;
      const user = await UserModel.findById(userId);
      // A missing user used to crash on `user.role` (500); it now gets the 403 below
      if (allowedRoles.length === 0 || (user && allowedRoles.includes(user.role)))
        return next();
      throw createError.Forbidden(
        "You do not have permission to access this resource."
      );
    } catch (error) {
      next(error);
    }
  };
}
