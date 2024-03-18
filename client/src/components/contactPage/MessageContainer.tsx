import { useEffect, useRef } from "react";
import { IMessage } from "../../../../types";
import { Message } from ".";

interface IProps {
  messages?: IMessage[];
}

export default function MessageContainer({ messages }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <div className="p-4 grow overflow-y-scroll flex flex-col gap-2">
      {!messages?.length ? (
        <div className="grow flex items-center justify-center">
          Send a message to start conversation.
        </div>
      ) : (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
      <div ref={ref}></div>
    </div>
  );
}
