import { createJob } from "./job.service.js";

export const submitJob = async (req, res) => {
  const { type, payload } = req.body;

  if (!payload?.idempotencyKey) {
    return res
      .status(400)
      .json({ message: "Idempotency key required" });
  }

  const job = await createJob({ type, payload });

  res.status(202).json(job);
};
