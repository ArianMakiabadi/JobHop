import type { CookieOptions, Request, Response } from "express";
import createError from "http-errors";
import twilio from "twilio";
import type RestException from "twilio/lib/base/RestException";
import { StatusCodes as HttpStatus } from "http-status-codes";
import { Controller } from "./controller";
import {
  generateRandomNumber,
  getAuthUser,
  setAccessToken,
  setRefreshToken,
  verifyRefreshToken,
} from "../../../utils/functions";
import { UserModel, type UserDocument } from "../../models/user";
import {
  completeProfileSchema,
  updateProfileSchema,
  checkOtpSchema,
  adminLoginSchema,
  type AdminLoginBody,
  type CheckOtpBody,
  type CompleteProfileBody,
  type GetOtpBody,
  type UpdateProfileBody,
} from "../validators/user.schema";
const CODE_EXPIRES = 90 * 1000; //90 seconds in miliseconds

const IS_TEST_MODE = process.env.IS_TESTING_MODE_OTP === "true";

// Values that updateUser drops from the update object
const EMPTY_VALUES: unknown[] = ["", " ", 0, null, undefined, "0", NaN];

function errorMessage(err: unknown): unknown {
  if (typeof err === "object" && err !== null && "message" in err && err.message)
    return err.message;
  return err;
}

class userAuthController extends Controller {
  code: number;
  phoneNumber: string | null;

  constructor() {
    super();
    this.code = 0;
    this.phoneNumber = null;
  }
  async getOtp(req: Request, res: Response): Promise<void> {
    console.log("getOtp fired from backend");
    let { phoneNumber }: GetOtpBody = req.body;

    if (!phoneNumber)
      throw createError.BadRequest("Please enter a valid phone number.");

    phoneNumber = phoneNumber.trim();
    this.phoneNumber = phoneNumber;
    this.code = generateRandomNumber(6);

    const result = await this.saveUser(phoneNumber);
    if (!result) throw createError.Unauthorized("Sign-in failed.");

    // send OTP

    if (IS_TEST_MODE) {
      res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        data: {
          message: `[Test Mode] Your login code is: ${this.code}`,
          expiresIn: CODE_EXPIRES,
          phoneNumber,
        },
      });
    } else {
      this.sendOTP(phoneNumber, res);
    }
  }

  //!
  async checkOtp(req: Request, res: Response): Promise<void> {
    await checkOtpSchema.validateAsync(req.body);
    const { otp: code, phoneNumber }: CheckOtpBody = req.body;

    const user = await UserModel.findOne(
      { phoneNumber },
      { password: 0, refreshToken: 0, accessToken: 0 },
    );

    if (!user) throw createError.NotFound("User not found");

    // If testing mode is enabled, validate against locally stored OTP
    if (IS_TEST_MODE) {
      // Same as the old loose `user.otp.code != code` (number vs string)
      if (!user.otp || user.otp.code !== Number(code))
        throw createError.BadRequest("Incorrect code!");
      if (new Date(`${user.otp.expiresIn}`).getTime() < Date.now())
        throw createError.BadRequest("This code has expired!");
    } else {
      // Use Twilio Verify to check the code
      try {
        const client = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN,
        );
        if (!phoneNumber || typeof phoneNumber !== "string")
          throw createError.BadRequest("Invalid phone number");

        if (!phoneNumber.startsWith("+"))
          console.warn(
            "Phone number not in E.164 format, Verify may reject it:",
            phoneNumber,
          );

        const verificationCheck = await client.verify
          .services(process.env.TWILIO_VERIFY_SID!)
          .verificationChecks.create({ to: phoneNumber, code });

        console.log("Twilio verificationCheck:", verificationCheck);

        if (!verificationCheck || verificationCheck.status !== "approved")
          throw createError.BadRequest("Incorrect code!");
      } catch (err) {
        console.error("Twilio Verify error:", errorMessage(err));
        throw createError.InternalServerError("Verification provider error");
      }
    }

    user.isVerifiedPhoneNumber = true;
    await user.save();

    // await setAuthCookie(res, user); // set httpOnly cookie
    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    let WELCOME_MESSAGE = `Welcome!`;
    if (!user.isActive) WELCOME_MESSAGE = `Code verified | complete your info.`;

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: WELCOME_MESSAGE,
        user,
      },
    });
  }
  async saveUser(phoneNumber: string): Promise<boolean | UserDocument> {
    const otp = IS_TEST_MODE
      ? { code: this.code, expiresIn: Date.now() + CODE_EXPIRES }
      : { expiresIn: Date.now() + CODE_EXPIRES };

    const user = await this.checkUserExist(phoneNumber);
    if (user) return await this.updateUser(phoneNumber, { otp });

    return await UserModel.create({
      phoneNumber,
      otp,
      // role: ROLES.USER,
    });
  }
  async checkUserExist(phoneNumber: string): Promise<UserDocument | null> {
    const user = await UserModel.findOne({ phoneNumber });
    return user;
  }
  async updateUser(
    phoneNumber: string,
    objectData: Record<string, unknown> = {},
  ): Promise<boolean> {
    Object.keys(objectData).forEach((key) => {
      if (EMPTY_VALUES.includes(objectData[key])) delete objectData[key];
    });
    const updatedResult = await UserModel.updateOne(
      { phoneNumber },
      { $set: objectData },
    );
    return !!updatedResult.modifiedCount;
  }
  //!
  sendOTP(phoneNumber: string, res: Response) {
    // Use Twilio Verify service to send the OTP code
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      );
      console.log("Calling Twilio Verify services with:", {
        service: process.env.TWILIO_VERIFY_SID,
        to: phoneNumber,
        channel: "sms",
      });

      client.verify
        .services(process.env.TWILIO_VERIFY_SID!)
        .verifications.create({ to: phoneNumber, channel: "sms" })
        .then((verification) => {
          console.log("Twilio Verify response:", verification);
          // verification.status is typically 'pending' when sent
          if (verification && verification.status) {
            return res.status(HttpStatus.OK).send({
              statusCode: HttpStatus.OK,
              data: {
                message: `A verification code has been sent to ${phoneNumber}`,
                expiresIn: CODE_EXPIRES,
                phoneNumber,
                providerStatus: verification.status,
              },
            });
          }

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to initiate verification",
          });
        })
        // Twilio rejects with a RestException; the optional chaining still covers anything else
        .catch((err: Partial<RestException> | undefined) => {
          console.error("Twilio Verify send error:", {
            message: err?.message,
            status: err?.status,
            code: err?.code,
            moreInfo: err?.moreInfo,
          });
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Please use a real phone number!",
          });
        });
    } catch (err) {
      console.error("Twilio configuration error:", err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "SMS provider configuration error",
      });
    }
  }
  async completeProfile(req: Request, res: Response): Promise<void> {
    await completeProfileSchema.validateAsync(req.body);
    const user = getAuthUser(req);
    const { name, email, role }: CompleteProfileBody = req.body;

    if (!user.isVerifiedPhoneNumber)
      throw createError.Forbidden("Please verify your phone number.");

    const duplicateUser = await UserModel.findOne({ email });
    console.log(duplicateUser);
    if (duplicateUser)
      throw createError.BadRequest("This email is already registered!");

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, email, isActive: true, role } },
      { new: true },
    );
    // Only if the user was deleted since verifyAccessToken; setAccessToken used to throw a TypeError (500)
    if (!updatedUser) throw createError.NotFound("User not found");
    // await setAuthCookie(res, updatedUser);
    await setAccessToken(res, updatedUser);
    await setRefreshToken(res, updatedUser);

    res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      data: {
        message: "Profile completed!",
        user: updatedUser,
      },
    });
  }
  async updateProfile(req: Request, res: Response): Promise<void> {
    const { _id: userId } = getAuthUser(req);
    await updateProfileSchema.validateAsync(req.body);
    const { name, email, biography, phoneNumber }: UpdateProfileBody = req.body;

    // The old `if (!updateResult.modifiedCount === 0)` check was always false and was removed
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: { name, email, biography, phoneNumber },
      },
    );
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Profile updated successfully",
      },
    });
  }
  async refreshToken(req: Request, res: Response): Promise<void> {
    const userId = await verifyRefreshToken(req);
    const user = await UserModel.findById(userId);
    // verifyRefreshToken already checked that the user exists; this only guards a concurrent delete
    if (!user) throw createError.Unauthorized("User account not found.");
    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  async getUserProfile(req: Request, res: Response): Promise<void> {
    const { _id: userId } = getAuthUser(req);
    const user = await UserModel.findById(userId, { otp: 0 });

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  logout(req: Request, res: Response): void {
    const cookieOptions: CookieOptions = {
      maxAge: 1,
      expires: new Date(), // res.cookie replaces it anyway, because maxAge is set
      httpOnly: true,
      signed: true,
      sameSite: "lax", // the cookie library lowercases it anyway: SameSite=Lax
      secure: true,
      path: "/",
      domain: process.env.DOMAIN,
    };
    res.cookie("accessToken", null, cookieOptions);
    res.cookie("refreshToken", null, cookieOptions);

    res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      roles: null,
      auth: false,
    });
  }
  async adminLogin(req: Request, res: Response): Promise<void> {
    await adminLoginSchema.validateAsync(req.body);
    const { email, password }: AdminLoginBody = req.body;

    // Find admin user in DB
    const adminUser = await UserModel.findOne({
      email: email.toLowerCase(),
      role: "ADMIN",
    });

    if (!adminUser) {
      throw createError.NotFound(
        "Admin user not found. Please create an admin user and set the password in the database.",
      );
    }

    // Compare provided password with the stored (plain-text) admin password
    if (!adminUser.password || password !== adminUser.password)
      throw createError.Unauthorized("Invalid admin credentials.");

    // ensure user is active/verified
    if (adminUser.role !== "ADMIN") adminUser.role = "ADMIN";
    adminUser.isActive = true;
    adminUser.isVerifiedPhoneNumber = true;
    await adminUser.save();

    // Set tokens
    await setAccessToken(res, adminUser);
    await setRefreshToken(res, adminUser);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: { message: "Admin signed in.", user: adminUser },
    });
  }

  async demoLogin(req: Request, res: Response): Promise<void> {
    await adminLoginSchema.validateAsync(req.body);
    const { email, password }: AdminLoginBody = req.body;

    // Find user in DB by email (no role check)
    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      throw createError.NotFound("User not found. Please check your email.");
    }

    // Compare provided password with the stored password
    if (!user.password || password !== user.password)
      throw createError.Unauthorized("Invalid password.");

    // ensure user is active/verified
    user.isActive = true;
    user.isVerifiedPhoneNumber = true;
    await user.save();

    // Set tokens
    await setAccessToken(res, user);
    await setRefreshToken(res, user);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: { message: "User signed in.", user },
    });
  }
}

export const UserAuthController = new userAuthController();
