import toast from "react-hot-toast";
import { ActionFunctionArgs } from "react-router-dom";
import { AxiosError } from "axios";
import apiFetch from "../configs/axios";

export const messageAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { content } = Object.fromEntries(formData);

  try {
    await apiFetch.post(`/messages/send/${params.id}`, {
      content: content.toString(),
      receiverId: params.id,
    });
    // return redirect(`/${params.id}`);
    return null;
  } catch (error) {
    console.log("MESSAGE ACTION", error);

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
