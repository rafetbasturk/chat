import { Socket, io } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../../types";

export const socketWithQuery = (
  userId: string
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  return io("https://chat-1ykr.onrender.com/", {
    query: {
      userId,
    },
  });
};
