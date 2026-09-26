import mongoose, { type HydratedDocument, type Types } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export type ProjectStatus = "OPEN" | "CLOSED";

export interface IProject {
  title: string;
  description: string;
  status: ProjectStatus;
  category: Types.ObjectId;
  budget: number;
  tags: string[];
  proposals: Types.ObjectId[];
  deadline: Date;
  owner: Types.ObjectId;
  freelancer: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectDocument = HydratedDocument<IProject>;

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: "OPEN",
      enum: ["OPEN", "CLOSED"],
    },
    category: { type: ObjectId, ref: "Category", required: true },
    budget: { type: Number, required: true },
    tags: [{ type: String }],
    proposals: { type: [ObjectId], ref: "PROPOSAL", default: [] },
    deadline: { type: Date, required: true },
    owner: { type: ObjectId, required: true, ref: "User" },
    freelancer: { type: ObjectId, default: null, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
