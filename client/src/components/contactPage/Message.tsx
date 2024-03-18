import { useLocation } from "react-router-dom";
import { IMessage } from "../../../../types";
import { formatDate } from "../../utils/formatDate";

interface IProps {
  message: IMessage;
}

export default function Message({ message }: IProps) {
  const location = useLocation();
  const isSender = location.pathname.includes(message.senderId);
  const sendTime = formatDate(message.createdAt);

  return (
    <div
      className={`flex flex-col gap-1 max-w-[80%] ${
        !isSender && "self-end place-items-end"
      }`}
    >
      <div
        className={`px-4 py-1 w-fit rounded-full ${
          !isSender ? "bg-blue-500" : "bg-gray-500"
        }`}
      >
        {message.content}
      </div>
      <span
        className={`text-[11px] text-gray-400 ${!isSender ? "mr-2" : "ml-2"}`}
      >
        {sendTime}
      </span>
    </div>
  );
}
