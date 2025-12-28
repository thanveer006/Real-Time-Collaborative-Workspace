import { Queue } from "bullmq";
import redis from "../database/redis.js";

export const jobQueue = new Queue("jobs", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
  },
});
