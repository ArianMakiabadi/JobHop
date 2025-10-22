const createError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../../utils/constants");

const addProposalSchema = Joi.object({
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

module.exports = {
  addProposalSchema,
};
