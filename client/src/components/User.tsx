import { FaUser } from "react-icons/fa";
import { IUser } from "../../../types";

interface IProps {
  isOnline?: boolean;
  contact?: IUser | null;
  isTyping?: boolean;
}

export default function User({ isOnline, contact, isTyping }: IProps) {
  return (
    <>
      <div className="relative w-fit">
        <FaUser className="w-10 h-10 bg-gray-400 p-2 rounded-full" />
        <span
          className={`w-3 h-3 rounded-full absolute top-0 right-0 ${
            isOnline ? "bg-green-400" : "bg-gray-200"
          }`}
        ></span>
      </div>
      <div>
        {contact && <div className="text-gray-50">{contact.name}</div>}
        {isTyping && <div className="text-xs text-gray-400">typing...</div>}
      </div>
    </>
  );
}
