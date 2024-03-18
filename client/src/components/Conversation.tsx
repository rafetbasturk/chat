import { Link, useOutletContext } from "react-router-dom";
import { IConversation } from "../loaders/conversationLoader";
import { BiConversation } from "react-icons/bi";
import { IUser } from "../../../types";

interface IProps {
  conversation: IConversation;
}

export default function Conversation({ conversation }: IProps) {
  const currentUser = useOutletContext() as IUser;
  const user = conversation.participants.filter((p) => {
    return p._id !== currentUser._id;
  })[0];

  console.log(user);

  return (
    <Link
      to={`/conversations/${conversation.participants[1]._id}`}
      className="py-2 border-b last-of-type:border-none first-of-type:pt-0"
    >
      <div className="grow flex gap-2 px-2 py-1 items-center hover:bg-gray-500 cursor-pointer rounded-md ">
        <BiConversation className="w-12 h-12 bg-gray-400 p-2 rounded-full" />
        <div className="flex flex-col">
          <span className="text-gray-50">{user.name}</span>
          <span className="text-gray-50">{user.email}</span>
        </div>
      </div>
    </Link>
  );
}
