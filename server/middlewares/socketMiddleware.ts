import { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../../types";

export interface SocketRequest extends Request {
  io: Server<ClientToServerEvents, ServerToClientEvents>;
}

export const socketMiddleware = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  return (req: SocketRequest, res: Response, next: NextFunction): void => {
    req.io = io;
    next();
  };
};
