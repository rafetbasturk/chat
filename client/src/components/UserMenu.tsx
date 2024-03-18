import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useFetcher, useRouteLoaderData } from "react-router-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { IAuthenticated } from "../../../types";

export default function UserMenu() {
  const { isAuthenticated, currentUser } = useRouteLoaderData(
    "root"
  ) as IAuthenticated;

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const fetcher = useFetcher();
  const isLoggingOut = fetcher.state !== "idle";

  const handleClickOutside = () => setShowUserMenu(false);
  useOutsideClick(userMenuRef, handleClickOutside);

  return (
    <div ref={userMenuRef} className="relative w-8 h-8 border rounded-full ">
      <div
        className="w-full h-full flex items-center justify-center"
        onClick={() => isAuthenticated && setShowUserMenu(!showUserMenu)}
      >
        <FaUser />
      </div>
      {isAuthenticated && showUserMenu && (
        <div className="absolute top-9 right-0 px-2 py-1 border rounded-sm border-gray-200 flex flex-col gap-2 bg-gray-700">
          <Link
            to={`/${currentUser?._id}`}
            onClick={() => setShowUserMenu(false)}
          >
            Profile
          </Link>
          <fetcher.Form method="post" action="/logout">
            <button disabled={isLoggingOut}>Logout</button>
          </fetcher.Form>
        </div>
      )}
    </div>
  );
}
