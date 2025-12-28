import express from "express";
import { authenticate, authorize } from "../../../middleware/auth.middleware.js";
import { create, list, invite } from "./project.controller.js";
import { update, remove, updateRole } from "./project.controller.js";
import { cache } from "../../../middleware/cache.middleware.js";

const router = express.Router();

router.post("/", authenticate, create);
router.post(
  "/:id/invite",
  authenticate,
  authorize(["OWNER"]),
  invite
);
router.put(
  "/:id",
  authenticate,
  authorize(["OWNER"]),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize(["OWNER"]),
  remove
);

router.patch(
  "/:id/role",
  authenticate,
  authorize(["OWNER"]),
  updateRole
);
router.get(
  "/",
  authenticate,
  cache((req) => `projects:${req.user.id}`, 120),
  list
);


export default router;
