import dotenv from "dotenv";
dotenv.config(); // 👈 GUARANTEES env is loaded here

import Redis from "ioredis";
import { URL } from "url";

const redisUrl = new URL(process.env.REDIS_URL);

const redis = new Redis({
  host: redisUrl.hostname,
  port: Number(redisUrl.port),
  username: redisUrl.username,
  password: redisUrl.password,
  tls: {},
  family: 4,
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error", err);
});

export default redis;
