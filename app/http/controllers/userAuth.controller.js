const Controller = require("./controller");
const {
  generateRandomNumber,
  setAccessToken,
  setRefreshToken,
  verifyRefreshToken,
} = require("../../../utils/functions");
const createError = require("http-errors");
const { UserModel } = require("../../models/user");
const twilio = require("twilio");
const CODE_EXPIRES = 90 * 1000; //90 seconds in miliseconds

const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  completeProfileSchema,
  updateProfileSchema,
  checkOtpSchema,
} = require("../validators/user.schema");
const IS_TEST_MODE = process.env.IS_TESTING_MODE_OTP === "true";

class userAuthController extends Controller {
  constructor() {
    super();
    this.code = 0;
    this.phoneNumber = null;
  }
  async getOtp(req, res) {
    console.log("getOtp fired from backend");
    let { phoneNumber } = req.body;

    if (!phoneNumber)
      throw createError.BadRequest("Please enter a valid phone number.");

    phoneNumber = phoneNumber.trim();
    this.phoneNumber = phoneNumber;
    this.code = generateRandomNumber(6);

    const result = await this.saveUser(phoneNumber);
    if (!result) throw createError.Unauthorized("Sign-in failed.");

    // send OTP

    if (IS_TEST_MODE) {
      return res.status(HttpStatus.OK).send({
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
  async checkOtp(req, res) {
    await checkOtpSchema.validateAsync(req.body);
    const { otp: code, phoneNumber } = req.body;

    const user = await UserModel.findOne(
      { phoneNumber },
      { password: 0, refreshToken: 0, accessToken: 0 }
    );

    if (!user) throw createError.NotFound("User not found");

    // If testing mode is enabled, validate against locally stored OTP
    if (IS_TEST_MODE) {
      if (!user.otp || user.otp.code != code)
        throw createError.BadRequest("Incorrect code!");
      if (new Date(`${user.otp.expiresIn}`).getTime() < Date.now())
        throw createError.BadRequest("This code has expired!");
    } else {
      // Use Twilio Verify to check the code
      try {
        const client = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );
        if (!phoneNumber || typeof phoneNumber !== "string")
          throw createError.BadRequest("Invalid phone number");

        if (!phoneNumber.startsWith("+"))
          console.warn(
            "Phone number not in E.164 format, Verify may reject it:",
            phoneNumber
          );

        const verificationCheck = await client.verify
          .services(process.env.TWILIO_VERIFY_SID)
          .verificationChecks.create({ to: phoneNumber, code });

        console.log("Twilio verificationCheck:", verificationCheck);

        if (!verificationCheck || verificationCheck.status !== "approved")
          throw createError.BadRequest("Incorrect code!");
      } catch (err) {
        console.error(
          "Twilio Verify error:",
          err && err.message ? err.message : err
        );
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

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: WELCOME_MESSAGE,
        user,
      },
    });
  }
  async saveUser(phoneNumber) {
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
  async checkUserExist(phoneNumber) {
    const user = await UserModel.findOne({ phoneNumber });
    return user;
  }
  async updateUser(phoneNumber, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updatedResult = await UserModel.updateOne(
      { phoneNumber },
      { $set: objectData }
    );
    return !!updatedResult.modifiedCount;
  }
  //!
  sendOTP(phoneNumber, res) {
    // Use Twilio Verify service to send the OTP code
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      console.log("Calling Twilio Verify services with:", {
        service: process.env.TWILIO_VERIFY_SID,
        to: phoneNumber,
        channel: "sms",
      });

      client.verify
        .services(process.env.TWILIO_VERIFY_SID)
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
        .catch((err) => {
          console.error(
            "Twilio Verify send error:",
            err && err.message ? err.message : err
          );
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to send verification code",
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
  async completeProfile(req, res) {
    await completeProfileSchema.validateAsync(req.body);
    const { user } = req;
    const { name, email, role } = req.body;

    if (!user.isVerifiedPhoneNumber)
      throw createError.Forbidden("Please verify your phone number.");

    const duplicateUser = await UserModel.findOne({ email });
    console.log(duplicateUser);
    if (duplicateUser)
      throw createError.BadRequest("This email is already registered!");

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, email, isActive: true, role } },
      { new: true }
    );
    // await setAuthCookie(res, updatedUser);
    await setAccessToken(res, updatedUser);
    await setRefreshToken(res, updatedUser);

    return res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      data: {
        message: "Profile completed!",
        user: updatedUser,
      },
    });
  }
  async updateProfile(req, res) {
    const { _id: userId } = req.user;
    await updateProfileSchema.validateAsync(req.body);
    const { name, email, biography, phoneNumber } = req.body;

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: { name, email, biography, phoneNumber },
      }
    );
    if (!updateResult.modifiedCount === 0)
      throw createError.BadRequest("Information was not updated.");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Profile updated successfully",
      },
    });
  }
  async refreshToken(req, res) {
    const userId = await verifyRefreshToken(req);
    const user = await UserModel.findById(userId);
    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  async getUserProfile(req, res) {
    const { _id: userId } = req.user;
    const user = await UserModel.findById(userId, { otp: 0 });

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  logout(req, res) {
    const cookieOptions = {
      maxAge: 1,
      expires: Date.now(),
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
      secure: true,
      path: "/",
      domain: process.env.DOMAIN,
    };
    res.cookie("accessToken", null, cookieOptions);
    res.cookie("refreshToken", null, cookieOptions);

    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      roles: null,
      auth: false,
    });
  }
}

module.exports = {
  UserAuthController: new userAuthController(),
};
