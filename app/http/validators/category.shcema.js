const Joi = require("joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");

const addCategorySchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(createHttpError.BadRequest("The category title (Persian) is invalid.")),
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

const updateCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .error(createHttpError.BadRequest("The category title (Persian) is invalid.")),
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
    .valid("product", "post", "comment", "ticket")
    .error(createHttpError.BadRequest("The category type is invalid.")),
});

module.exports = {
  addCategorySchema,
  updateCategorySchema,
};
