const Joi = require("joi");
const createHttpError = require("http-errors");

// Accept only E.164 international format (e.g. +491234567890)
const e164PhoneNumber = Joi.string()
  .pattern(/^\+[1-9][0-9]{1,14}$/)
  .error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمیباشد"));

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
    .error(createHttpError.BadRequest("نام کاربری وارد شده صحیح نمی باشد")),
  email: Joi.string()
    .email()
    .error(createHttpError.BadRequest("ایمیل وارد شده صحیح نمی باشد")),
  role: Joi.string()
    .required()
    .valid("FREELANCER", "EMPLOYER")
    .error(createHttpError.BadRequest("نقش وارد شده صحیح نمی باشد")),
});

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(50)
    .required()
    .error(createHttpError.BadRequest("نام کاربری وارد شده صحیح نمی باشد")),
  email: Joi.string()
    .required()
    .email()
    .error(createHttpError.BadRequest("ایمیل وارد شده صحیح نمی باشد")),
  phoneNumber: Joi.string()
    .pattern(/^\+[1-9][0-9]{1,14}$/)
    .error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمیباشد")),
  biography: Joi.string()
    .max(30)
    .allow("")
    .error(createHttpError.BadRequest("حوزه تخصصی صحیح نمی باشد.")),
});

module.exports = {
  getOtpSchema,
  completeProfileSchema,
  checkOtpSchema,
  updateProfileSchema,
};
