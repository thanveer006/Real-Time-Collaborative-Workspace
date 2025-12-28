import {
  createWorkspace,
  getWorkspacesByProject,
} from "./workspace.service.js";

export const create = async (req, res) => {
  const workspace = await createWorkspace(
    req.body,
    req.user.id
  );
  res.status(201).json(workspace);
};

export const list = async (req, res) => {
  const workspaces = await getWorkspacesByProject(req.params.projectId);
  res.status(200).json(workspaces);
};
