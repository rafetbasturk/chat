import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error(
      "useSocket hook must be used within the SocketContextProvider."
    );
  return context;
};
