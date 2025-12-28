import { Worker } from "bullmq";
import redis from "../database/redis.js";
import Job from "../../domain/entities/Job.js";

export const jobWorker = new Worker(
  "jobs",
  async (job) => {
    try {
      // Mark job as processing
      await Job.findOneAndUpdate(
        { jobId: job.id },
        { status: "PROCESSING" }
      );

      // 🔧 Mock processing logic (as per assessment)
      const result = {
        message: "Job processed successfully",
        data: job.data,
      };

      // Mark job as completed
      await Job.findOneAndUpdate(
        { jobId: job.id },
        {
          status: "COMPLETED",
          result,
        }
      );

      return result;
    } catch (error) {
      // Mark job as failed
      await Job.findOneAndUpdate(
        { jobId: job.id },
        {
          status: "FAILED",
          error: error.message,
        }
      );

      throw error;
    }
  },
  {
    connection: redis,
  }
);

jobWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

jobWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed`, err.message);
});
