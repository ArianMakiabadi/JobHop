import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ProjectController } from "../http/controllers/project.controller";
import { ROLES } from "../../utils/constants";
import { authorize } from "../http/middlewares/permission.guard";

const router = Router();

router.get("/list", expressAsyncHandler(ProjectController.getListOfProjects));
router.get(
  "/employer-projects",
  authorize(ROLES.ADMIN, ROLES.EMPLOYER),
  expressAsyncHandler(ProjectController.getListOfOwnerProjects)
);
router.post(
  "/add",
  authorize(ROLES.ADMIN, ROLES.EMPLOYER),
  expressAsyncHandler(ProjectController.addNewProject)
);
router.get(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.EMPLOYER),
  expressAsyncHandler(ProjectController.getProjectById)
);
router.patch(
  "/update/:id",
  authorize(ROLES.ADMIN, ROLES.EMPLOYER),
  expressAsyncHandler(ProjectController.updateProject)
);
router.patch(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.EMPLOYER),
  expressAsyncHandler(ProjectController.changeProjectStatus)
);
router.delete(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.EMPLOYER),
  expressAsyncHandler(ProjectController.deleteProject)
);

export { router as projectRoutes };
