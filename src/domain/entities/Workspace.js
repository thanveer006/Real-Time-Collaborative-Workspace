import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["OWNER", "COLLABORATOR", "VIEWER"],
          default: "VIEWER",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Workspace", workspaceSchema);
