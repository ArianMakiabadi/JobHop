import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { CategoryController } from "../http/controllers/category.controller";

const router = Router();

router.get(
  "/list",
  expressAsyncHandler(CategoryController.getListOfCategories)
);

router.get("/:id", expressAsyncHandler(CategoryController.getCategoryById));

export { router as categoryRoutes };
