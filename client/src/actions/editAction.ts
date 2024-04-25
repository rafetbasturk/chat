import toast from "react-hot-toast";
import { ActionFunctionArgs } from "react-router-dom";
import { AxiosError } from "axios";
import apiFetch from "../configs/axios";
import { uploadCloudinary } from "../utils/uploadCloudinary";

export const editAction = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const { file, name, lastname, bio } = Object.fromEntries(formData);

  let avatar;
  if (file) {
    avatar = await uploadCloudinary(file as File, "odinchat-avatar");
  }

  try {
    await apiFetch.patch(`/users/${params.id}/edit`, {
      name,
      lastname,
      bio,
      avatar,
    });
    toast.success("Changes saved.");
    return null;
  } catch (error) {
    // console.log("EDIT ACTION", error);

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
