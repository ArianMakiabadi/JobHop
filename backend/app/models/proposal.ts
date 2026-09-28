import mongoose, { type HydratedDocument, type Types } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

// 0 rejected, 1 pending, 2 accepted
export type ProposalStatus = 0 | 1 | 2;

export interface IProposal {
  price: number;
  duration: number;
  description: string;
  user: Types.ObjectId;
  status: ProposalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ProposalDocument = HydratedDocument<IProposal>;

const ProposalSchema = new mongoose.Schema<IProposal>(
  {
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true },
    status: {
      type: Number,
      required: true,
      default: 1,
      enum: [0, 1, 2],
    },
  },
  {
    timestamps: true,
  }
);

export const ProposalModel = mongoose.model<IProposal>("Proposal", ProposalSchema);
