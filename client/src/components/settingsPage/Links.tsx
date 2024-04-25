import { NavLink, useLoaderData } from "react-router-dom";
import { IUser } from "../../../../types";
import { CgChevronRight, CgProfile } from "react-icons/cg";

export default function Links() {
  const user = useLoaderData() as IUser;

  return (
    <nav className="flex flex-col gap-2">
      <NavLink
        to="edit"
        className="flex gap-2 items-center p-2 rounded-lg [&.active]:bg-blue-400 [&.active]:bg-opacity-50"
      >
        <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden object-cover">
          {user.avatar === "default.jpg" ? (
            <div className="p-2 text-xl font-semibold uppercase ">
              <span>{user.name.charAt(0)}</span>
              <span>{user.lastname.charAt(0)}</span>
            </div>
          ) : (
            <img src={user.avatar} alt="avatar" />
          )}
        </div>
        <div className="text-sm">
          <div>
            <span>{user.name}</span> <span>{user.lastname}</span>
          </div>
          <div>{user.email}</div>
        </div>
      </NavLink>
      <NavLink
        to={`/profile/${user._id}`}
        end
        className="p-2 rounded-lg [&.active]:bg-blue-400 [&.active]:bg-opacity-50"
      >
        <div className="flex gap-2 items-center justify-between">
          <CgProfile className="w-6 h-6" />
          <span className="grow">My Profile</span>
          {<CgChevronRight />}
        </div>
      </NavLink>
    </nav>
  );
}
