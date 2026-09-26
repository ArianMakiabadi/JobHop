import type { Request, Response } from "express";
import { StatusCodes as HttpStatus } from "http-status-codes";
import createHttpError from "http-errors";
import { Controller } from "./controller";
import {
  addCategorySchema,
  updateCategorySchema,
  type UpdateCategoryBody,
} from "../validators/category.schema";
import { CategoryModel, type CategoryDocument } from "../../models/category";

class CategoryController extends Controller {
  async getListOfCategories(req: Request, res: Response): Promise<void> {
    const query = req.query;
    const categories = await CategoryModel.find(query);
    if (!categories)
      throw createHttpError.ServiceUnavailable("Categories not found.");

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        categories,
      },
    });
  }
  async addNewCategory(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    const { title, englishTitle, description, type, parent } =
      await addCategorySchema.validateAsync(req.body);
    await this.findCategoryWithTitle(englishTitle);
    const category = await CategoryModel.create({
      title,
      englishTitle,
      description,
      type,
      parent,
    });

    if (!category) throw createHttpError.InternalServerError("Internal error.");
    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "Category added successfully",
      },
    });
  }
  async findCategoryWithTitle(englishTitle: string): Promise<void> {
    const category = await CategoryModel.findOne({ englishTitle });
    if (category)
      throw createHttpError.BadRequest(
        "A category with this title already exists."
      );
  }
  async checkExistCategory(id: string): Promise<CategoryDocument> {
    const category = await CategoryModel.findById(id);
    if (!category)
      throw createHttpError.BadRequest("No category with this title exists.");
    return category;
  }
  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, englishTitle, type, description }: UpdateCategoryBody =
      req.body;
    await this.checkExistCategory(id);
    await updateCategorySchema.validateAsync(req.body);
    const updateResult = await CategoryModel.updateOne(
      { _id: id },
      {
        $set: { title, englishTitle, type, description },
      }
    );
    if (updateResult.modifiedCount == 0)
      throw createHttpError.InternalServerError("Update failed.");
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Updated successfully",
      },
    });
  }
  async removeCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const category = await this.checkExistCategory(id);
    const deleteResult = await CategoryModel.deleteMany({
      $or: [{ _id: category._id }, { parentId: category._id }],
    });
    if (deleteResult.deletedCount == 0)
      throw createHttpError.InternalServerError("Category deletion failed.");
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Category deleted successfully",
      },
    });
  }
  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const category = await this.checkExistCategory(id);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        category,
      },
    });
  }
}

const categoryController = new CategoryController();
export { categoryController as CategoryController };
