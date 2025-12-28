import mongoose from "mongoose";
import redis from "../src/infrastructure/database/redis.js";

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await redis.quit(); // 👈 THIS FIXES THE HANG
});
