import { ActionFunctionArgs } from "react-router-dom";
import apiFetch from "../configs/axios";
import { IUser } from "../../../types";

export interface SearchActionResponse {
  contacts: IUser[];
}

export const searchAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const query = formData.get("search");

  if (!formData.get("search")) {
    return null;
  }

  try {
    const { data } = await apiFetch.get<SearchActionResponse>(
      `/users?search=${query}`
    );
    return data.contacts;
  } catch (error) {
    console.log(error);
  }

  return null;
};
