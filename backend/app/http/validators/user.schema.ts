import Joi from "joi";
import createHttpError from "http-errors";

// Request bodies as validated by the schemas below (raw JSON, before Joi conversion).
// Fields without `.required()` in the schema are optional.

export interface GetOtpBody {
  phoneNumber?: string;
}

export interface CheckOtpBody {
  otp?: string;
  phoneNumber?: string;
}

export interface CompleteProfileBody {
  name?: string;
  email?: string;
  role: "FREELANCER" | "EMPLOYER";
}

export interface UpdateProfileBody {
  name: string;
  email: string;
  phoneNumber?: string;
  biography?: string;
}

export interface AdminLoginBody {
  email: string;
  password: string;
}

// Accept only E.164 international format (e.g. +491234567890)
const e164PhoneNumber = Joi.string()
  .pattern(/^\+[1-9][0-9]{1,14}$/)
  .error(createHttpError.BadRequest("The phone number provided is invalid."));

export const getOtpSchema = Joi.object<GetOtpBody>({
  phoneNumber: e164PhoneNumber,
});

export const checkOtpSchema = Joi.object<CheckOtpBody>({
  otp: Joi.string()
    .min(5)
    .max(6)
    .error(createHttpError.BadRequest("Incorrect code!")),
  phoneNumber: e164PhoneNumber,
});

export const completeProfileSchema = Joi.object<CompleteProfileBody>({
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

export const updateProfileSchema = Joi.object<UpdateProfileBody>({
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

// Add admin login schema
export const adminLoginSchema = Joi.object<AdminLoginBody>({
  email: Joi.string().trim().lowercase().required().email().error(createHttpError.BadRequest("Invalid email address.")),
  password: Joi.string().required().min(6).error(createHttpError.BadRequest("Invalid password.")),
});
