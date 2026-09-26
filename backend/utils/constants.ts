export const MongoIDPattern = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

export const ROLES = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
  FREELANCER: "FREELANCER",
  EMPLOYER: "EMPLOYER",
} as const);

export type Role = (typeof ROLES)[keyof typeof ROLES];
