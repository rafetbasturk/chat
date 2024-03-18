import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useOutletContext } from "react-router-dom";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  IUser,
} from "../../../types";
import { Socket } from "socket.io-client";
import { socketWithQuery } from "../configs/socket";

interface IContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<IContext | null>(null);

export default function SocketContextProvider({ children }: PropsWithChildren) {
  const currentUser = useOutletContext() as IUser;
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      socketRef.current = socketWithQuery(currentUser?._id as string);

      socketRef.current.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketRef.current?.disconnect();
        socketRef.current?.off("getOnlineUsers");
      };
    } else {
      socketRef.current?.disconnect();
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current as Socket,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
