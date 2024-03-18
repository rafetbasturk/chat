import { Schema, Types, model } from "mongoose";

export interface IMessage {
  content: string;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  // seenIds: Types.ObjectId[];
  // conversationId?: Types.ObjectId;
}

const schema = new Schema<IMessage>(
  {
    content: {
      type: String,
      required: [true, "You can't send an empty message."],
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the sender of the message."],
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the receiver of the message."],
    },
    // seenIds: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // conversationId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Conversation",
    // },
  },
  {
    timestamps: true,
  }
);

export default model<IMessage>("Message", schema);
