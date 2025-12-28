import {
  createProject,
  getUserProjects,
  addCollaborator,
  updateProject,
  deleteProject,
  updateCollaboratorRole,
} from "./project.service.js";
import redis from "../../../infrastructure/database/redis.js";

export const create = async (req, res) => {
  const project = await createProject(req.body, req.user.id);

  // invalidate cache
  await redis.del(`projects:${req.user.id}`);

  res.status(201).json(project);
};

export const list = async (req, res) => {
  const projects = await getUserProjects(req.user.id);
  res.status(200).json(projects);
};

export const invite = async (req, res) => {
  const { userId, role } = req.body;
  const project = await addCollaborator(req.params.id, userId, role);

  // invalidate cache
  await redis.del(`projects:${req.user.id}`);

  res.status(200).json(project);
};

export const update = async (req, res) => {
  const project = await updateProject(
    req.params.id,
    req.body,
    req.user.id
  );

  if (!project) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // invalidate cache
  await redis.del(`projects:${req.user.id}`);

  res.status(200).json(project);
};

export const remove = async (req, res) => {
  const project = await deleteProject(
    req.params.id,
    req.user.id
  );

  if (!project) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // invalidate cache
  await redis.del(`projects:${req.user.id}`);

  res.status(204).send();
};

export const updateRole = async (req, res) => {
  const { userId, role } = req.body;

  const project = await updateCollaboratorRole(
    req.params.id,
    userId,
    role
  );

  // invalidate cache
  await redis.del(`projects:${req.user.id}`);

  res.status(200).json(project);
};
