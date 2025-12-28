import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import redis from "../database/redis.js";

const REDIS_CHANNEL = "workspace-events";

export const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  /**
   * Redis subscriber for cross-instance events
   */
  const subscriber = redis.duplicate();
  subscriber.subscribe(REDIS_CHANNEL);

  subscriber.on("message", (_, message) => {
    const event = JSON.parse(message);
    io.to(event.workspaceId).emit(event.type, event.payload);
  });

  /**
   * Socket auth middleware
   */
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized"));

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      );
      socket.user = decoded;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.user.id);

    /**
     * Join workspace
     */
    socket.on("join-workspace", ({ workspaceId }) => {
      socket.join(workspaceId);

      redis.publish(
        REDIS_CHANNEL,
        JSON.stringify({
          type: "user-joined",
          workspaceId,
          payload: {
            userId: socket.user.id,
          },
        })
      );
    });

    /**
     * Leave workspace
     */
    socket.on("leave-workspace", ({ workspaceId }) => {
      socket.leave(workspaceId);

      redis.publish(
        REDIS_CHANNEL,
        JSON.stringify({
          type: "user-left",
          workspaceId,
          payload: {
            userId: socket.user.id,
          },
        })
      );
    });

    /**
     * File change (mocked)
     */
    socket.on("file-change", ({ workspaceId, file }) => {
      redis.publish(
        REDIS_CHANNEL,
        JSON.stringify({
          type: "file-change",
          workspaceId,
          payload: {
            userId: socket.user.id,
            file,
          },
        })
      );
    });

    /**
     * Cursor / activity update
     */
    socket.on("cursor-update", ({ workspaceId, position }) => {
      redis.publish(
        REDIS_CHANNEL,
        JSON.stringify({
          type: "cursor-update",
          workspaceId,
          payload: {
            userId: socket.user.id,
            position,
          },
        })
      );
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.user.id);
    });
  });

  return io;
};
