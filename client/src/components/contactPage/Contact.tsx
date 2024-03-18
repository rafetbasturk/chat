import { Link, useLocation } from "react-router-dom";
import { IUser } from "../../../../types";
import { useSocket } from "../../hooks/useSocket";
import User from "../User";

interface IProps {
  contact: IUser;
}

export default function Contact({ contact }: IProps) {
  const location = useLocation();
  const { onlineUsers } = useSocket();

  const isSelected = location.pathname.includes(contact?._id as string);
  const isOnline = onlineUsers.includes(contact?._id as string);

  return (
    <Link
      to={`${contact?._id}`}
      className="flex py-2 border-b border-gray-300 last-of-type:border-none first-of-type:pt-0"
    >
      <div
        className={`grow border-l-4 flex gap-2 px-2 py-1 items-center hover:bg-gray-500 cursor-pointer rounded-md ${
          isSelected ? "bg-gray-600 border-blue-400" : "border-transparent"
        }`}
      >
        <User isOnline={isOnline} contact={contact} />
      </div>
    </Link>
  );
}
