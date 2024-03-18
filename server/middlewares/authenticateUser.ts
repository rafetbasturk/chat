import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors";

interface CustomRequest extends Request {
  token: string;
  user: string | JwtPayload;
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;

  if (!token) {
    throw new UnAuthenticatedError("Authentication Failed!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

    (req as CustomRequest).user = decoded;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid!");
  }
}
