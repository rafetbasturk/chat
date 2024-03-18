import { useLoaderData } from "react-router-dom";
import { ConversationLoaderResponse } from "../loaders/conversationLoader";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations } = useLoaderData() as ConversationLoaderResponse;
  console.log(conversations);

  return conversations?.map((conversation, i) => (
    <Conversation key={i} conversation={conversation} />
  ));
}
