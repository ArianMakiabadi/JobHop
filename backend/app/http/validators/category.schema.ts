import Joi from "joi";
import createHttpError from "http-errors";
import { MongoIDPattern } from "../../../utils/constants";
import type { CategoryType } from "../../models/category";

/** `req.body` of `POST /admin/category/add`, as validated by `addCategorySchema`. */
export interface AddCategoryBody {
  title: string;
  englishTitle: string;
  description: string;
  type: CategoryType;
  parent?: string;
}

/** `req.body` of `PATCH /admin/category/update/:id`, as validated by `updateCategorySchema`. */
export interface UpdateCategoryBody {
  title?: string;
  englishTitle?: string;
  description: string;
  type: CategoryType;
}

export const addCategorySchema = Joi.object<AddCategoryBody>({
  title: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest("The category title (Persian) is invalid.")
    ),
  englishTitle: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest("The category title (English) is invalid.")
    ),
  description: Joi.string()
    .required()
    .min(3)
    .max(200)
    .error(createHttpError.BadRequest("The category description is invalid.")),
  type: Joi.string()
    .required()
    .min(3)
    .max(100)
    .valid("project", "post", "comment", "ticket")
    .error(createHttpError.BadRequest("The category type is invalid.")),
  parent: Joi.string()
    .allow("")
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest("The provided parent ID is invalid.")),
});

export const updateCategorySchema = Joi.object<UpdateCategoryBody>({
  title: Joi.string()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest("The category title (Persian) is invalid.")
    ),
  englishTitle: Joi.string()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest("The category title (English) is invalid.")
    ),
  description: Joi.string()
    .required()
    .min(3)
    .max(200)
    .error(createHttpError.BadRequest("The category description is invalid.")),
  type: Joi.string()
    .required()
    .min(3)
    .max(100)
    .valid("project", "post", "comment", "ticket")
    .error(createHttpError.BadRequest("The category type is invalid.")),
});
