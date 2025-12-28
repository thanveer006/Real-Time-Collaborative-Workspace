import { Worker } from "bullmq";
import redis from "../infrastructure/database/redis.js";
import Job from "../domain/entities/Job.js";

const worker = new Worker(
  "jobs",
  async (job) => {
    await Job.findOneAndUpdate(
      { jobId: job.id },
      { status: "PROCESSING" }
    );

    // 🔹 Simulate async task (code execution / build)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      message: "Job executed successfully",
      input: job.data,
    };
  },
  {
    connection: redis,
  }
);

worker.on("completed", async (job, result) => {
  await Job.findOneAndUpdate(
    { jobId: job.id },
    { status: "COMPLETED", result }
  );
});

worker.on("failed", async (job, err) => {
  await Job.findOneAndUpdate(
    { jobId: job.id },
    {
      status: "FAILED",
      error: err.message,
    }
  );
});

export default worker;
