const createError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../../utils/constants");

const addProjectSchema = Joi.object({
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

module.exports = {
  addProjectSchema,
};
