import toast from "react-hot-toast";
import { ActionFunctionArgs } from "react-router-dom";
import { AxiosError } from "axios";
import apiFetch from "../configs/axios";
import { uploadCloudinary } from "../utils/uploadCloudinary";

export const messageAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const { file, content } = Object.fromEntries(formData);

  const message = {
    content: "",
    receiverId: params.id,
  };

  if (file) {
    message.content = await uploadCloudinary(file as File, "odinchat");
  } else {
    message.content = content.toString();
  }

  try {
    await apiFetch.post(`/messages/send/${params.id}`, message);
    // return redirect(`/${params.id}`);
    return null;
  } catch (error) {
    // console.log("MESSAGE ACTION", error);

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
