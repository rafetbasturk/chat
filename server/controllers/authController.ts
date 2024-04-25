import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import User from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { attachCookie } from "../utils/attachCookie";
import { io } from "..";

export async function register(req: Request, res: Response) {
  const { name, email, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    throw new BadRequestError("Please provide all values!");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) throw new Error("Email already in use!");

  const user = await User.create(req.body);
  const token = user.createJWT();
  attachCookie(res, token);

  user.set("password", undefined);

  io.emit("userConnected", user.name);

  res.status(StatusCodes.CREATED).json({
    user,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.login(email, password);
  const token = user.createJWT();
  attachCookie(res, token);

  io.emit("userConnected", user.name);

  res.status(StatusCodes.OK).json({
    user,
  });
}

interface CustomRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export async function getCurrentUser(req: Request, res: Response) {
  const request = req as CustomRequest;

  const currentUser = await User.findOne({
    _id: request.user?.userId,
  }).populate("friends");

  res.status(StatusCodes.OK).json({
    currentUser,
  });
}

export async function logout(req: Request, res: Response) {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(StatusCodes.OK).json({
    msg: "user logged out!",
  });
}
