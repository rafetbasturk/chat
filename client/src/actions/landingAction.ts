import toast from "react-hot-toast";
import { redirect } from "react-router-dom";
import apiFetch from "../configs/axios";
import { AxiosError } from "axios";

export const landingAction = async () => {
  const demoUser = { email: "rafet@mail.com", password: "1234" };

  try {
    await apiFetch.post("/auth/login", demoUser);
    toast.success("Logged in successfully as demo user");
    return redirect("/");
  } catch (error) {
    // console.log("LANDING ACTION", error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.msg);
      return redirect("/landing");
    }
  }
};
