import { Schema, Types, model } from "mongoose";

interface IConversation {
  messages: Types.ObjectId[];
  participants: Types.ObjectId[];
}

const schema = new Schema<IConversation>(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IConversation>("Conversation", schema);
