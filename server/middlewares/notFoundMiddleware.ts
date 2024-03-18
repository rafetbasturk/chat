import { Request, Response } from "express";

export default function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({
    msg: "Route does not exist",
  });
}
