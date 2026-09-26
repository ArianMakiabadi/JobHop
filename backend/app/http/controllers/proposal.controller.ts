import type { Request, Response } from "express";
import { StatusCodes as HttpStatus } from "http-status-codes";
import mongoose, { type FilterQuery } from "mongoose";
import createHttpError from "http-errors";
import { Controller } from "./controller";
import {
  ProposalModel,
  type IProposal,
  type ProposalDocument,
  type ProposalStatus,
} from "../../models/proposal";
import {
  addProposalSchema,
  type AddProposalBody,
} from "../validators/proposal.schema";
import { ProjectModel } from "../../models/project";
import {
  copyObject,
  getAuthUser,
  getQueryString,
} from "../../../utils/functions";
import { ROLES } from "../../../utils/constants";

/** `req.body` of `PATCH /proposal/:id` (no schema). The frontend also sends `projectId`, which is not read. */
interface ChangeProposalStatusBody {
  status: ProposalStatus | `${ProposalStatus}`;
}

class ProposalController extends Controller {
  async addNewProposal(req: Request, res: Response): Promise<void> {
    const userId = getAuthUser(req)._id;
    await addProposalSchema.validateAsync(req.body);
    const { description, price, duration, projectId }: AddProposalBody =
      req.body;

    const proposal = await ProposalModel.create({
      description,
      price,
      duration,
      user: userId,
    });
    await ProjectModel.updateOne(
      { _id: projectId },
      { $push: { proposals: proposal._id } }
    );
    if (!proposal?._id)
      throw createHttpError.InternalServerError("Proposal was not created.");

    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "Proposal created successfully",
      },
    });
  }
  async getListOfProposals(req: Request, res: Response): Promise<void> {
    const dbQuery: FilterQuery<IProposal> = {};
    const sort = getQueryString(req.query.sort);

    const user = getAuthUser(req);
    if (user.role !== ROLES.ADMIN) {
      dbQuery["user"] = user._id;
    }

    const sortQuery: Record<string, 1 | -1> = {};

    if (!sort) sortQuery["createdAt"] = 1;
    if (sort) {
      if (sort === "latest") sortQuery["createdAt"] = -1;
      if (sort === "earliest") sortQuery["createdAt"] = 1;
    }

    const proposals = await ProposalModel.find(dbQuery).sort(sortQuery);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        proposals,
      },
    });
  }
  async getProposalById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const proposal = await this.findProposalById(id);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        proposal,
      },
    });
  }
  async findProposalById(id: string): Promise<ProposalDocument> {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest("Project id is not correct!");
    const proposal = await ProposalModel.findById(id);
    if (!proposal) throw createHttpError.NotFound("Project not found!");
    return proposal;
  }
  async changeProposalStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const body: ChangeProposalStatusBody = req.body;
    const status = Number(body.status);

    const proposal = await ProposalModel.findOneAndUpdate(
      { _id: id },
      { $set: { status } } // 0, 1, 2
    );
    if (!proposal)
      throw createHttpError.InternalServerError("Proposal status was not updated.");

    const project = await ProjectModel.findOne({
      proposals: { $in: [proposal._id] },
    });
    // `project._id` used to throw a TypeError (500) here
    if (!project) throw createHttpError.NotFound("Project not found!");

    const freelancer =
      status === 2 ? copyObject<{ user: string }>(proposal).user : null;

    await ProjectModel.updateOne(
      { _id: project._id },
      { $set: { freelancer } }
    );

    let message = "Proposal status approved";
    if (status === 0) message = "Proposal rejected!";
    if (status === 1) message = "Proposal accepted!";

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    });
  }
}

const proposalController = new ProposalController();
export { proposalController as ProposalController };
