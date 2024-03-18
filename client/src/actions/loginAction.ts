import toast from "react-hot-toast";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { authStatus } from "../auth";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);
  const { email, password } = entries;

  if (!email || !password) {
    toast.error("Please provide both email and password!");
    return null;
  }

  const user = { email: email.toString(), password: password.toString() };

  try {
    await authStatus.login(user);
    toast.success("Logged in successfully.");
    return redirect("/");
  } catch (error) {
    console.log("LOGIN ACTION", error);

    if (error instanceof AxiosError) {
      toast.error(
        error.response?.data.msg || "An error occurred. Please try again."
      );
    } else {
      toast.error("An unexpected error occurred.");
    }

    return null;
  }
};