import "dotenv/config";
import { Server, Socket } from "socket.io";

import { ClientToServerEvents, ServerToClientEvents } from "../../types";

export const socketIo = (server: any, mode: string | undefined) => {
  return new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    pingTimeout: 30000,
    cors: {
      origin:
        mode === "production"
          ? ["https://chat-1ykr.onrender.com/"]
          : ["http://localhost:5173"],
      credentials: true,
    },
  });
};

const socketUsersMap: Record<string, string> = {};

export const getReceiverSocketId = (recieverId: string): string => {
  return socketUsersMap[recieverId];
};

export const connection = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  return io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      console.log(`User with socketId: ${socket.id} is connected`);

      const userId = socket.handshake.query.userId;

      if (userId) {
        socketUsersMap[userId as string] = socket.id;
        io.emit("getOnlineUsers", Object.keys(socketUsersMap));

        socket.on("typing", (data) => {
          io.to(socketUsersMap[data.id]).emit("display", data.value);
        });
      }

      socket.on("disconnect", () => {
        console.log(`User with socketId: ${socket.id} is disconnected`);

        delete socketUsersMap[userId as string];

        io.emit("getOnlineUsers", Object.keys(socketUsersMap));
      });
    }
  );
};
