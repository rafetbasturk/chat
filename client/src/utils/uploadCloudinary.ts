import axios from "axios";

export const uploadCloudinary = async (file: File, preset: string) => {
  const url = `https://api.cloudinary.com/v1_1/dyvjgse5q/upload`;
  const formData = new FormData();
  formData.append("upload_preset", preset);
  formData.append("file", file);

  const { data } = await axios.post(url, formData);

  return data.secure_url;
};
