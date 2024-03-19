import { Socket, io } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../../types";

const url = import.meta.env.DEV ? "http://localhost:5000/" : "https://chat-1ykr.onrender.com/"

export const socketWithQuery = (
  userId: string
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  return io(url, {
    query: {
      userId,
    },
  });
};
