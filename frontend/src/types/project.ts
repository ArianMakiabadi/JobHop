import type { CategoryRef } from "./category";
import type { ProposalWithUser } from "./proposal";
import type { UserRef } from "./user";

export type ProjectStatus = "OPEN" | "CLOSED";

interface ProjectBase {
  _id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  budget: number;
  tags: string[];
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

/** Project as stored, with unpopulated refs (e.g. the create response). */
export interface RawProject extends ProjectBase {
  category: string;
  owner: string;
  freelancer: string | null;
  proposals: string[];
}

/** Project as returned by the list endpoints (category, owner, freelancer populated). */
export interface Project extends ProjectBase {
  category: CategoryRef;
  owner: UserRef;
  freelancer: UserRef | null;
  proposals: string[];
}

/** Project as returned by `GET /project/:id` (proposals populated too). */
export interface ProjectDetail extends Omit<Project, "proposals"> {
  proposals: ProposalWithUser[];
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  // form inputs send strings; the backend coerces them
  budget: number | string;
  category: string;
  tags: string[];
  deadline: string;
}

export interface EditProjectPayload {
  id: string;
  newProject: CreateProjectPayload;
}

export interface ToggleProjectStatusPayload {
  id: string;
  data: { status: ProjectStatus };
}
