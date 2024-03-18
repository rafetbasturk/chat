import { Socket, io } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../../types";

export const socketWithQuery = (
  userId: string
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  return io("ws://localhost:5000", {
    query: {
      userId,
    },
  });
};
