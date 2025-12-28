import redis from "../infrastructure/database/redis.js";

export const cache = (keyBuilder, ttl = 60) => {
  return async (req, res, next) => {
    try {
      const key = keyBuilder(req);
      const cached = await redis.get(key);

      if (cached) {
        return res.status(200).json(JSON.parse(cached));
      }

      const originalJson = res.json.bind(res);

      res.json = (data) => {
        redis.setex(key, ttl, JSON.stringify(data));
        return originalJson(data);
      };

      next();
    } catch (error) {
      next();
    }
  };
};
