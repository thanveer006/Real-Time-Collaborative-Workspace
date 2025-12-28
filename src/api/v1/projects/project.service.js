import Project from "../../../domain/entities/Project.js";

export const createProject = async (data, userId) => {
  const project = await Project.create({
    ...data,
    owner: userId,
    collaborators: [{ user: userId, role: "OWNER" }],
  });

  return project;
};

export const getUserProjects = async (userId) => {
  return Project.find({
    "collaborators.user": userId,
  }).populate("owner", "name email");
};

export const addCollaborator = async (projectId, userId, role) => {
  return Project.findByIdAndUpdate(
    projectId,
    {
      $push: {
        collaborators: { user: userId, role },
      },
    },
    { new: true }
  );
};

export const updateProject = async (projectId, data, userId) => {
  return Project.findOneAndUpdate(
    {
      _id: projectId,
      "collaborators.user": userId,
      "collaborators.role": "OWNER",
    },
    data,
    { new: true }
  );
};

export const deleteProject = async (projectId, userId) => {
  return Project.findOneAndDelete({
    _id: projectId,
    "collaborators.user": userId,
    "collaborators.role": "OWNER",
  });
};

export const updateCollaboratorRole = async (
  projectId,
  targetUserId,
  role
) => {
  return Project.findOneAndUpdate(
    {
      _id: projectId,
      "collaborators.user": targetUserId,
    },
    {
      $set: {
        "collaborators.$.role": role,
      },
    },
    { new: true }
  );
};
