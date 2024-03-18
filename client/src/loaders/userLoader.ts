import { LoaderFunctionArgs, json } from "react-router-dom";
import apiFetch from "../configs/axios";
import { IUser } from "../../../types";
import { AxiosError } from "axios";

export interface UserLoaderResponse {
  user: IUser;
}

export const getUser = async (id: string) => {
  const {
    data: { user },
  } = await apiFetch.get<UserLoaderResponse>(`/users/${id}`);
  return user;
};

export const getUserQuery = (id: string) => {
  return {
    queryKey: ["user", id],
    queryFn: () => getUser(id as string),
  };
};

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const user = await getUser(params.id as string);
    return json(user, { status: 200 });
  } catch (error) {
    console.log("USER LOADER", error);
    if (error instanceof AxiosError) {
      throw json(error, {
        status: error.response?.status,
        statusText: error.response?.data.msg,
      });
    }
    return json(error, { status: 500, statusText: "Something went wrong" });
  }
};
