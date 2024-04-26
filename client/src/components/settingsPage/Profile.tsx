import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import Heading from "./Heading";
import { IUser } from "../../../../types";

export default function Profile() {
  const user = useRouteLoaderData("profile") as IUser;
  const { id } = useParams();

  return (
    <div className="flex flex-col h-full">
      <Heading>Info</Heading>
      <div className="grow bg-gray-800 p-10 flex flex-col gap-8 overflow-y-scroll">
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-4 items-center">
          <div className="w-28 h-28 bg-gray-400 overflow-hidden rounded-full flex items-center justify-center">
            {user.avatar === "default.jpg" ? (
              <div className="p-2 text-2xl font-semibold uppercase ">
                <span>{user.name.charAt(0)}</span>
                <span>{user.lastname.charAt(0)}</span>
              </div>
            ) : (
              <img src={user.avatar} alt="avatar" />
            )}
          </div>
          <div>
            <span>{user.name}</span> <span>{user.lastname}</span>
          </div>
        </div>
        {user.bio && (
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-4 items-center text-lg">
            {user.bio}
          </div>
        )}
      </div>
      <Link
        to={`/profile/${id}/edit`}
        className="absolute right-10 top-6 text-blue-400"
      >
        Edit
      </Link>
    </div>
  );
}
