import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ProposalController } from "../http/controllers/proposal.controller";
import { ROLES } from "../../utils/constants";
import { authorize } from "../http/middlewares/permission.guard";

const router = Router();

router.get(
  "/list",
  authorize(ROLES.FREELANCER, ROLES.ADMIN),
  expressAsyncHandler(ProposalController.getListOfProposals)
);
router.post(
  "/add",
  authorize(ROLES.FREELANCER, ROLES.ADMIN),
  expressAsyncHandler(ProposalController.addNewProposal)
);
router.get(
  "/:id",
  authorize(ROLES.FREELANCER, ROLES.ADMIN),
  expressAsyncHandler(ProposalController.getProposalById)
);
router.patch(
  "/:id",
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  expressAsyncHandler(ProposalController.changeProposalStatus)
);

export { router as proposalRoutes };
