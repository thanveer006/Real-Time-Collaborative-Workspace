import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./api/v1/auth/auth.routes.js";
import exampleRoutes from "./api/v1/example/example.routes.js";
import projectRoutes from "./api/v1/projects/project.routes.js";
import workspaceRoutes from "./api/v1/workspaces/workspace.routes.js";
import jobRoutes from "./api/v1/jobs/job.routes.js";
import { rateLimiter } from "./middleware/rateLimiter.middleware.js";
import { swaggerSetup } from "./swagger.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);
swaggerSetup(app);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/example", exampleRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/workspaces", workspaceRoutes);
app.use("/api/v1/jobs", jobRoutes);

export default app;
