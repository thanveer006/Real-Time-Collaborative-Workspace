import express from "express";
import { authenticate } from "../../../middleware/auth.middleware.js";
import { submitJob } from "./job.controller.js";

const router = express.Router();

router.post("/", authenticate, submitJob);

export default router;
