import express from "express";
import { authenticate, authorize } from "../../../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Only logged-in users
 */
router.get(
  "/profile",
  authenticate,
  (req, res) => {
    res.status(200).json({
      message: "Protected profile route",
      user: req.user,
    });
  }
);

/**
 * Only OWNER role
 */
router.get(
  "/owner-only",
  authenticate,
  authorize(["OWNER"]),
  (req, res) => {
    res.status(200).json({
      message: "Owner-only access granted",
    });
  }
);

export default router;
