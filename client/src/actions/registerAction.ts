import toast from "react-hot-toast";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { authStatus } from "../auth";

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);
  const { name, email, password, confirm } = entries;

  if (!email || !password || !name || !confirm) {
    toast.error("Please provide all values!");
    return null;
  }

  const newUser = {
    name: name.toString(),
    email: email.toString(),
    password: password.toString(),
    confirm: confirm.toString(),
  };

  try {
    await authStatus.register(newUser);
    toast.success("Registered successfully. Redirecting!");
    return redirect("/");
  } catch (error) {
    console.log("REGISTER ACTION", error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.msg);
      return null;
    }
  }
};
