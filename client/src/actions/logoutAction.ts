import { redirect } from "react-router-dom";
import { authStatus } from "../auth";

export const logoutAction = async () => {
  await authStatus.logout();
  return redirect("/landing");
};
