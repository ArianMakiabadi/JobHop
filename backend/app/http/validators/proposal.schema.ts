import createError from "http-errors";
import Joi from "joi";
import { MongoIDPattern } from "../../../utils/constants";

/** `req.body` of `POST /proposal/add`, as validated by `addProposalSchema` (raw JSON, before Joi conversion). */
export interface AddProposalBody {
  description: string;
  price?: number | string;
  duration: number | string;
  projectId: string;
}

export const addProposalSchema = Joi.object<AddProposalBody>({
  description: Joi.string()
    .required()
    .error(createError.BadRequest("The proposal description is required and must be valid.")),
  price: Joi.number().error(
    createError.BadRequest("The price provided is invalid.")
  ),
  duration: Joi.number()
    .required()
    .error(createError.BadRequest("Please provide the expected project duration.")),
  projectId: Joi.string()
    .required()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("The provided project ID is invalid.")),
});
