import { redirect } from "react-router-dom";
import { authStatus } from "../auth";

export const currentUserLoader = async () => {
  try {
    const data = await authStatus.getCurrentUser();
    return { ...data };
  } catch (error) {
    // console.log("CURRENT USER LOADER", error);
    return redirect("/login");
  }
};
