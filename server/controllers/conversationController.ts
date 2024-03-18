import { Request, Response } from "express";
import Conversation from "../models/conversationModel";
import { StatusCodes } from "http-status-codes";

interface CustomRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export async function getUserConversations(req: Request, res: Response) {
  const request = req as CustomRequest;
  const senderId = request.user?.userId;

  const conversations = await Conversation.find({
    participants: {
      $in: [senderId],
    },
  }).populate("participants");

  res.status(StatusCodes.OK).json({
    conversations: conversations || [],
  });
}
