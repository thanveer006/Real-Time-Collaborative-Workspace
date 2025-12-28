import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectMongo from "./infrastructure/database/mongo.js";
import "./infrastructure/database/postgres.js";
import "./infrastructure/database/redis.js";
import { initSocketServer } from "./infrastructure/websocket/socketServer.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectMongo();

  const server = http.createServer(app);

  initSocketServer(server);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
