import { jobQueue } from "../../../infrastructure/queue/jobQueue.js";
import Job from "../../../domain/entities/Job.js";

export const createJob = async ({ type, payload }) => {
  const existing = await Job.findOne({ jobId: payload.idempotencyKey });
  if (existing) return existing;

  const job = await jobQueue.add(type, payload, {
    jobId: payload.idempotencyKey,
  });

  const dbJob = await Job.create({
    jobId: job.id,
    type,
  });

  return dbJob;
};
