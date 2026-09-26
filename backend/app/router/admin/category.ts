import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { CategoryController } from "../../http/controllers/category.controller";

const router = Router();

router.post("/add", expressAsyncHandler(CategoryController.addNewCategory));
router.patch(
  "/update/:id",
  expressAsyncHandler(CategoryController.updateCategory)
);
router.delete(
  "/remove/:id",
  expressAsyncHandler(CategoryController.removeCategory)
);

export { router as categoryAdminRoutes };
