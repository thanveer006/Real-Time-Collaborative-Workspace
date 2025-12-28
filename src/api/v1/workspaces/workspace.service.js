import Workspace from "../../../domain/entities/Workspace.js";

export const createWorkspace = async (data, userId) => {
  const workspace = await Workspace.create({
    ...data,
    members: [{ user: userId, role: "OWNER" }],
  });

  return workspace;
};

export const getWorkspacesByProject = async (projectId) => {
  return Workspace.find({ project: projectId });
};
