import { useLoaderData, useRevalidator } from "react-router-dom";
import { MessageLoaderResponse } from "../../loaders/messageLoader";
import { MessageContainer, MessageForm } from ".";
import User from "../User";
import { useSocket } from "../../hooks/useSocket";
import { useEffect, useState } from "react";
import notification from "../../assets/sounds/button.mp3";

export default function ConversationContent() {
  const [isTyping, setIsTyping] = useState(false);
  const { user, messages } = useLoaderData() as MessageLoaderResponse;
  const revalidator = useRevalidator();
  const { socket, onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(user?._id as string);

  useEffect(() => {
    socket?.on("newServerMessage", () => {
      const sound = new Audio(notification);
      sound.play();
      if (revalidator.state === "idle") {
        setIsTyping(false);
        revalidator.revalidate();
      }
    });

    socket?.on("displayTyping", (data) => {
      setIsTyping(false);
      if (data) {
        setIsTyping(true);
      }
    });

    return () => {
      socket?.off("newServerMessage");
      socket?.off("displayTyping");
    };
  }, [socket, revalidator]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="px-4 py-2 border-b border-gray-500 flex items-center gap-4">
        <User isOnline={isOnline} contact={user} isTyping={isTyping} />
      </div>

      <MessageContainer messages={messages} />

      <MessageForm />
    </div>
  );
}
