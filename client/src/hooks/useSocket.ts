import { useContext } from "react";
import { SocketContext } from "../contexts/socketContext";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error(
      "useSocket hook must be used within the SocketContextProvider."
    );
  return context;
};
