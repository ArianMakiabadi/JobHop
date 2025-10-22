const Joi = require("joi");
const createHttpError = require("http-errors");

// Accept only E.164 international format (e.g. +491234567890)
const e164PhoneNumber = Joi.string()
  .pattern(/^\+[1-9][0-9]{1,14}$/)
  .error(createHttpError.BadRequest("The phone number provided is invalid."));

const getOtpSchema = Joi.object({
  phoneNumber: e164PhoneNumber,
});

const checkOtpSchema = Joi.object({
  otp: Joi.string()
    .min(5)
    .max(6)
    .error(createHttpError.BadRequest("Incorrect code!")),
  phoneNumber: e164PhoneNumber,
});

const completeProfileSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(100)
    .error(createHttpError.BadRequest("The username provided is invalid.")),
  email: Joi.string()
    .email()
    .error(createHttpError.BadRequest("The email provided is invalid.")),
  role: Joi.string()
    .required()
    .valid("FREELANCER", "EMPLOYER")
    .error(createHttpError.BadRequest("The role provided is invalid.")),
});

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(50)
    .required()
    .error(createHttpError.BadRequest("The username provided is invalid.")),
  email: Joi.string()
    .required()
    .email()
    .error(createHttpError.BadRequest("The email provided is invalid.")),
  phoneNumber: Joi.string()
    .pattern(/^\+[1-9][0-9]{1,14}$/)
    .error(createHttpError.BadRequest("The phone number provided is invalid.")),
  biography: Joi.string()
    .max(30)
    .allow("")
    .error(
      createHttpError.BadRequest("The selected expertise area is not valid.")
    ),
});

module.exports = {
  getOtpSchema,
  completeProfileSchema,
  checkOtpSchema,
  updateProfileSchema,
};
