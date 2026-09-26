import mongoose, { type HydratedDocument, type Types } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export type CategoryType = "project" | "comment" | "post" | "ticket";

export interface ICategory {
  title: string;
  englishTitle: string;
  description: string;
  type: CategoryType;
  parentId: Types.ObjectId | null;
  icon: {
    sm: string | null;
    lg: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryDocument = HydratedDocument<ICategory>;

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    title: { type: String, required: true, unique: true },
    englishTitle: { type: String, required: true, unique: true },
    description: { type: String, required: true, trim: true, lowercase: true },
    type: {
      type: String,
      enum: ["project", "comment", "post","ticket"],
      default: "project",
      required: true,
    },
    parentId: {
      type: ObjectId,
      ref: "Category",
      default: null,
    },
    icon: {
      sm: { type: String, default: null },
      lg: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ title: "text", englishTitle: "text" });

export const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
