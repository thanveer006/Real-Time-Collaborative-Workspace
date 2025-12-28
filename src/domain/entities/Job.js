import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
    result: {
      type: Object,
    },
    error: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
