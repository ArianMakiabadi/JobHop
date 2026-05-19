const expressAsyncHandler = require("express-async-handler");
const { ProjectController } = require("../http/controllers/project.controller");
const { ROLES } = require("../../utils/constants");
const { authorize } = require("../http/middlewares/permission.guard");

const router = require("express").Router();

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

module.exports = {
  projectRoutes: router,
};
