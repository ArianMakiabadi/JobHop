import type { UserRef } from "./user";

/** 0 = rejected, 1 = pending, 2 = approved */
export type ProposalStatus = 0 | 1 | 2;

export interface Proposal {
  _id: string;
  price: number;
  duration: number;
  description: string;
  user: string;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
}

/** Proposal as populated in the project detail (`user: { name }`). */
export interface ProposalWithUser extends Omit<Proposal, "user"> {
  user: UserRef;
}

export interface CreateProposalPayload {
  description: string;
  // form inputs send strings; the backend coerces them
  price: number | string;
  duration: number | string;
  projectId: string;
}

export interface ChangeProposalStatusPayload {
  proposalId: string;
  projectId: string;
  // radio inputs send the status as a string; the backend converts it
  status: ProposalStatus | `${ProposalStatus}`;
}
