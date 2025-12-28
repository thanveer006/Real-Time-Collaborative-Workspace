import express from "express";
import { authenticate } from "../../../middleware/auth.middleware.js";
import { create, list } from "./workspace.controller.js";
import { cache } from "../../../middleware/cache.middleware.js";

const router = express.Router();

router.post("/", authenticate, create);
router.get(
  "/:projectId",
  authenticate,
  cache(
    (req) => `workspaces:${req.params.projectId}`,
    120
  ),
  list
);

export default router;
