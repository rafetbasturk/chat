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
        <div className="w-12 h-12 overflow-hidden bg-gray-400 rounded-full flex items-center justify-center text-3xl object-contain ">
          {contact?.avatar === "default.jpg" ? <FaUser /> : <img src={contact?.avatar} alt="avatar" /> }
        </div>
        <span
          className={`w-3 h-3 rounded-full absolute top-0 right-0 ${
            isOnline ? "bg-green-400" : "bg-gray-200"
          }`}
        ></span>
      </div>
      <div>
        {contact && (
          <div className="text-gray-50">
            <span>{contact.name}</span>
            {" "}
            <span>{contact.lastname}</span>
          </div>
        )}
        {isTyping && (
          <div className="text-xs text-gray-400 animate-bounce">typing...</div>
        )}
      </div>
    </>
  );
}
