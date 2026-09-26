import createError from "http-errors";
import Joi from "joi";
import { MongoIDPattern } from "../../../utils/constants";

/** `req.body` of project add/update, as validated by `addProjectSchema` (raw JSON, before Joi conversion). */
export interface AddProjectBody {
  title: string;
  description: string;
  tags?: string[];
  category: string;
  budget?: number | string;
  deadline: string;
}

export const addProjectSchema = Joi.object<AddProjectBody>({
  title: Joi.string()
    .required()
    .min(3)
    .max(30)
    .error(createError.BadRequest("Title is not correct")),
  description: Joi.string()
    .required()
    .error(createError.BadRequest("Description is not correct")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(createError.BadRequest("You cannot have more than 20 tags")),
  category: Joi.string()
    .required()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("Category is not correct")),
  budget: Joi.number().error(createError.BadRequest("Budget is not correct")),
  deadline: Joi.date()
    .required()
    .error(createError.BadRequest("Enter the deadline")),
});
