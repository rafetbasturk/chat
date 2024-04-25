import { Request, Response } from "express";
import User from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

interface CustomRequest extends Request {
  user: {
    userId: string;
    role: string;
  };
  image?: File | undefined;
}

interface IQuery {
  _id: { $ne: string | undefined };
  name?: {
    $regex: string;
    $options: string;
  };
}

export async function getUser(req: Request, res: Response) {
  const user = await User.findById(req.params.id).populate("friends");
  if (!user) {
    throw new BadRequestError(
      `There is no user matching id: "${req.params.id}"`
    );
  }
  res.status(StatusCodes.OK).json({
    user,
  });
}

export async function getContacts(req: Request, res: Response) {
  const request = req as CustomRequest;
  const { search } = request.query;

  const query: IQuery = {
    _id: { $ne: request.user?.userId },
  };

  if (search) {
    query.name = {
      $regex: search as string,
      $options: "i",
    };
  }

  const contacts = await User.find(query)
    .sort({ name: "asc" })
    .populate("friends");

  res.status(StatusCodes.OK).json({
    contacts,
  });
}

export async function uploadImage(req: Request, res: Response) {
  const request = req as CustomRequest;

  console.log(request.image);

  res.status(StatusCodes.OK).json({ imageUrl: "" });
}

export async function updateUser(req: Request, res: Response) {
  const request = req as CustomRequest;
  const { userId } = request.user;

  const user = await User.findByIdAndUpdate(userId, request.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    user,
  });
}
