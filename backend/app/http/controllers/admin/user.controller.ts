import type { Request, Response } from "express";
import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import { UserModel, type UserStatus } from "../../../models/user";
import { Controller } from "../controller";
import { ProjectModel } from "../../../models/project";
import { ProposalModel } from "../../../models/proposal";
import { getQueryString } from "../../../../utils/functions";

/** `req.body` of `PATCH /admin/user/verify/:userId` (no schema). */
interface VerifyUserBody {
  status: UserStatus | `${UserStatus}`;
}

class UserController extends Controller {
  // ADMIN ROUTES :
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const page = Number(getQueryString(req.query.page) || 1);
    const limit = Number(getQueryString(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const search = getQueryString(req.query.search);
    // new RegExp(undefined) and new RegExp("") both match everything
    const searchTerm = new RegExp(search ?? "", "ig");
    // const databaseQuery = {};
    // if (search) databaseQuery["$text"] = { $search: search };
    const users = await UserModel.find({
      $or: [
        { name: searchTerm },
        { email: searchTerm },
        { phoneNumber: searchTerm },
      ],
    })
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        users,
      },
    });
  }
  async userProfile(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const user = await UserModel.findById(userId, { otp: 0 });
    const createdProjects = await ProjectModel.find({ EMPLOYER: userId });
    const completedProjects = await ProjectModel.find({ freelancer: userId });
    const proposals = await ProposalModel.find({ user: userId });

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        user,
        createdProjects,
        completedProjects,
        proposals,
      },
    });
  }
  async verifyUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const body: VerifyUserBody = req.body;
    const status = Number(body.status);
    const updateResult = await UserModel.updateOne(
      { _id: userId },
      { $set: { status } }
    );

    if (updateResult.modifiedCount === 0)
      throw createHttpError.InternalServerError(
        "User status could not be updated!"
      );

    let message = "User accepted!";
    if (status === 0) message = "User rejected!";
    if (status === 1) message = "Status changed to pending!";

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    });
  }
}

const userController = new UserController();
export { userController as UserController };
