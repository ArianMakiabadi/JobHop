import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { UserController } from "../../http/controllers/admin/user.controller";

const router = Router();

router.get("/list", expressAsyncHandler(UserController.getAllUsers));
router.patch("/verify/:userId", expressAsyncHandler(UserController.verifyUser));
router.get("/profile/:userId", expressAsyncHandler(UserController.userProfile));

export { router as userAdminRoutes };
