export type CategoryType = "project" | "comment" | "post" | "ticket";

export interface Category {
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
  type: CategoryType;
  parentId: string | null;
  icon: {
    sm: string | null;
    lg: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

/** Category reference as populated on projects (`select: { title, englishTitle }`). */
export type CategoryRef = Pick<Category, "_id" | "title" | "englishTitle">;

export interface CategoryPayload {
  title: string;
  englishTitle: string;
  description: string;
  type: CategoryType;
}

export interface UpdateCategoryPayload {
  id: string;
  data: CategoryPayload;
}
