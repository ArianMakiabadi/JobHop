import type { Request, Response } from "express";
import { StatusCodes as HttpStatus } from "http-status-codes";
import mongoose, { type FilterQuery, type Types } from "mongoose";
import createHttpError from "http-errors";
import { Controller } from "./controller";
import { CategoryModel } from "../../models/category";
import {
  ProjectModel,
  type IProject,
  type ProjectDocument,
  type ProjectStatus,
} from "../../models/project";
import {
  addProjectSchema,
  type AddProjectBody,
} from "../validators/project.schema";
// Registers the "Proposal" model that getProjectById populates
import "../../models/proposal";
import { getAuthUser, getQueryString } from "../../../utils/functions";

/** `req.body` of `PATCH /project/:id` (no schema). */
interface ChangeProjectStatusBody {
  status: ProjectStatus;
}

type SortQuery = Record<string, 1 | -1>;

class ProjectController extends Controller {
  async addNewProject(req: Request, res: Response): Promise<void> {
    const userId = getAuthUser(req)._id;
    await addProjectSchema.validateAsync(req.body);
    const { title, description, tags, category, budget, deadline }: AddProjectBody =
      req.body;

    const project = await ProjectModel.create({
      title,
      description,
      tags,
      category,
      budget,
      deadline,
      owner: userId,
    });

    if (!project?._id)
      throw createHttpError.InternalServerError("Project was not created.");

    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "Project created successfully",
        project,
      },
    });
  }
  async getListOfProjects(req: Request, res: Response): Promise<void> {
    const dbQuery: FilterQuery<IProject> = {};
    const search = getQueryString(req.query.search);
    const category = getQueryString(req.query.category);
    const sort = getQueryString(req.query.sort);
    const status = getQueryString(req.query.status);

    // SEARCH
    if (search) dbQuery["$text"] = { $search: search };

    // STATUS
    if (status === "OPEN" || status === "CLOSED") {
      dbQuery["status"] = { $eq: status };
    }
    // CATEGORY
    if (category && !category.includes("ALL")) {
      const categories = category.split(",");
      const categoryIds: Types.ObjectId[] = [];
      for (const item of categories) {
        const category = await CategoryModel.findOne({ englishTitle: item });
        if (category) categoryIds.push(category._id);
      }
      dbQuery["category"] = {
        $in: categoryIds,
      };
    }

    // SORT
    const sortQuery: SortQuery = {};
    if (!sort) sortQuery["createdAt"] = 1;
    if (sort) {
      if (sort === "latest") sortQuery["createdAt"] = -1;
      if (sort === "earliest") sortQuery["createdAt"] = 1;
    }

    const projects = await ProjectModel.find(dbQuery)
      .populate([
        { path: "category", select: { title: 1, englishTitle: 1 } },
        { path: "freelancer", select: { name: 1 } },
        { path: "owner", select: { name: 1 } },
      ])
      .sort(sortQuery);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        projects,
      },
    });
  }
  async getListOfOwnerProjects(req: Request, res: Response): Promise<void> {
    const dbQuery: FilterQuery<IProject> = {};
    const user = getAuthUser(req);
    dbQuery.owner = user._id;

    const search = getQueryString(req.query.search);
    const category = getQueryString(req.query.category);
    const sort = getQueryString(req.query.sort);

    if (search) dbQuery["$text"] = { $search: search };
    if (category) {
      const categories = category.split(",");
      const categoryIds: Types.ObjectId[] = [];
      for (const item of categories) {
        // Unknown titles are skipped, as in getListOfProjects (destructuring null used to throw a 500)
        const found = await CategoryModel.findOne({ englishTitle: item });
        if (found) categoryIds.push(found._id);
      }
      dbQuery["category"] = {
        $in: categoryIds,
      };
    }

    const sortQuery: SortQuery = {};
    if (!sort) sortQuery["createdAt"] = 1;
    if (sort) {
      if (sort === "latest") sortQuery["createdAt"] = -1;
      if (sort === "earliest") sortQuery["createdAt"] = 1;
      if (sort === "popular") sortQuery["likes"] = -1;
    }

    const projects = await ProjectModel.find(dbQuery)
      .populate([
        { path: "category", select: { title: 1, englishTitle: 1 } },
        { path: "owner", select: { name: 1 } },
        { path: "freelancer", select: { name: 1 } },
      ])
      .sort(sortQuery);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        projects,
      },
    });
  }
  async getProjectById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.findProjectById(id);
    const project = await ProjectModel.findById(id).populate([
      {
        path: "category",
        model: "Category",
        select: {
          title: 1,
          englishTitle: 1,
        },
      },
      {
        path: "proposals",
        model: "Proposal",
        populate: [
          {
            path: "user",
            model: "User",
            select: { name: 1 },
          },
        ],
      },
      {
        path: "owner",
        model: "User",
        select: { name: 1 },
      },
      {
        path: "freelancer",
        model: "User",
        select: { name: 1 },
      },
    ]);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        project,
      },
    });
  }
  async findProjectById(id: string): Promise<ProjectDocument> {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest("The provided project ID is invalid.");
    const project = await ProjectModel.findById(id);
    if (!project) throw createHttpError.NotFound("Project not found.");
    return project;
  }
  async changeProjectStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status }: ChangeProjectStatusBody = req.body;

    const updateResult = await ProjectModel.updateOne(
      { _id: id },
      { $set: { status } } // 0, 1, 2
    );

    if (updateResult.modifiedCount === 0)
      throw createHttpError.InternalServerError(
        "Proposal status was not updated."
      );

    let message = "Project closed";
    if (status === "OPEN") message = "Project status changed to open";

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    });
  }
  async deleteProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const project = await this.findProjectById(id);

    if (project.freelancer)
      throw createHttpError.BadRequest(
        "Project already assigned to a freelancer!"
      );

    const result = await ProjectModel.deleteOne({ _id: id });
    if (result.deletedCount)
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "Project deleted successfully!",
        },
      });
  }
  async updateProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.findProjectById(id);
    const { title, description, tags, deadline, category, budget }: AddProjectBody =
      req.body;
    console.log(req.body);
    await addProjectSchema.validateAsync(req.body);
    const updateResult = await ProjectModel.updateOne(
      { _id: id },
      {
        $set: { title, description, tags, deadline, category, budget },
      }
    );
    if (updateResult.modifiedCount == 0)
      throw createHttpError.InternalServerError("Update failed.");
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Update completed successfully",
      },
    });
  }
}

const projectController = new ProjectController();
export { projectController as ProjectController };
