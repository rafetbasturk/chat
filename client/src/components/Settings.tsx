import { useLoaderData } from "react-router-dom";
import { IUser } from "../../../types";

export default function Settings() {
  const user = useLoaderData() as IUser;

  return <p>Welcome {user?.name}!</p>;
}
