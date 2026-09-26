import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
// import { uploadFile } from "../../utils/multer";
import { verifyAccessToken } from "../http/middlewares/user.middleware";
import { UserAuthController } from "../http/controllers/userAuth.controller";

const router = Router();

router.post("/get-otp", expressAsyncHandler(UserAuthController.getOtp));
router.post("/check-otp", expressAsyncHandler(UserAuthController.checkOtp));
router.post("/admin-login", expressAsyncHandler(UserAuthController.adminLogin));
router.post("/demo-login", expressAsyncHandler(UserAuthController.demoLogin));
router.post(
  "/complete-profile",
  verifyAccessToken,
  expressAsyncHandler(UserAuthController.completeProfile)
);
router.get(
  "/refresh-token",
  expressAsyncHandler(UserAuthController.refreshToken)
);
router.patch(
  "/update",
  verifyAccessToken,
  expressAsyncHandler(UserAuthController.updateProfile)
);

router.get(
  "/profile",
  verifyAccessToken,
  expressAsyncHandler(UserAuthController.getUserProfile)
);

router.post("/logout", expressAsyncHandler(UserAuthController.logout));

export { router as userAuthRoutes };
