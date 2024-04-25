import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Message from "../models/messageModel";
import Conversation from "../models/conversationModel";
import { getReceiverSocketId } from "../config/socket";
import { io } from "..";

interface CustomRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export async function getMessages(req: Request, res: Response) {
  const request = req as CustomRequest;
  const senderId = request.user?.userId;
  const receiverId = request.params.id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  res.status(StatusCodes.OK).json({
    messages: conversation?.messages || [],
  });
}

export async function sendMessage(req: Request, res: Response) {
  const request = req as CustomRequest;

  const senderId = request.user?.userId;
  const { id: receiverId } = req.params;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    ...request.body,
    senderId,
    receiverId,
  });

  const message = await Message.create(newMessage);

  conversation.messages.push(message._id);
  await conversation.save();

  // socket functionality
  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newServerMessage")
  }

  res.status(StatusCodes.CREATED).json({
    message,
  });
}
