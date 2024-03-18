import { IoMdContact, IoIosSettings } from "react-icons/io";
import { NavLink, useOutletContext } from "react-router-dom";
import { IUser } from "../../../types";

export default function Navbar() {
  const currentUser = useOutletContext() as IUser | null;

  return (
    <nav className="flex text-gray-300 border-t border-gray-500">
      <NavLink
        to={"/"}
        className={"[&.active]:text-blue-400 hover:bg-gray-600 grow"}
      >
        <IoMdContact className="h-8 w-8 m-auto my-2" />
      </NavLink>
      {/* <NavLink
        to={"/conversations"}
        className={"[&.active]:text-blue-400 basis-1/3 hover:bg-gray-600"}
      >
        <IoIosChatbubbles className="h-8 w-8 m-auto my-2" />
      </NavLink> */}
      <NavLink
        to={`/settings/${currentUser?._id}`}
        className={"[&.active]:text-blue-400 hover:bg-gray-600 grow"}
      >
        <IoIosSettings className="h-8 w-8 m-auto my-2" />
      </NavLink>
    </nav>
  );
}
