import type { UserDocument } from "../app/models/user";

declare global {
  namespace Express {
    interface Request {
      /** Set by `verifyAccessToken`. Read it with `getAuthUser(req)` from `utils/functions`. */
      user?: UserDocument;
    }
  }
}

export {};
