import redis from "../infrastructure/database/redis.js";

const WINDOW_SIZE_IN_SECONDS = 60; // 1 minute
const MAX_REQUESTS = 100;

export const rateLimiter = async (req, res, next) => {
  try {
    const identifier =
      req.user?.id || req.ip; // user-based or IP-based

    const key = `rate-limit:${identifier}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, WINDOW_SIZE_IN_SECONDS);
    }

    if (current > MAX_REQUESTS) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (error) {
    // Fail open (do not block traffic if Redis fails)
    next();
  }
};
