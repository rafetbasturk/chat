import { LoaderFunctionArgs, json, redirect } from "react-router-dom";
import { AxiosError } from "axios";
import apiFetch from "../configs/axios";
import { IMessage, IUser } from "../../../types";

export interface UserResponse {
  user: IUser;
}

export interface MessageResponse {
  messages: IMessage[];
}

export interface MessageLoaderResponse {
  messages?: IMessage[];
  user?: IUser;
}

const getUser = async (id: string) => {
  const {
    data: { user },
  } = await apiFetch.get<UserResponse>(`/users/${id}`);
  return user;
};

const getMessages = async (id: string) => {
  const {
    data: { messages },
  } = await apiFetch.get<MessageResponse>(`/messages/${id}`);
  return messages;
};

export const messageLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const results = await Promise.allSettled([
      getMessages(params.id as string),
      getUser(params.id as string),
    ]);

    const response: MessageLoaderResponse = {};

    for (const result of results) {
      if (result.status === "rejected") {
        throw json(result.reason, {
          status: result.reason.status,
          statusText: result.reason.statusText,
        });
      }
      if (result.status === "fulfilled") {
        if (results.indexOf(result) === 0) {
          response.messages = result.value as IMessage[];
        } else {
          response.user = result.value as IUser;
        }
      }
    }

    return response;
  } catch (error) {
    // console.log("MESSAGE LOADER", error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return redirect("/login");
      }
      throw json(error, {
        status: error.response?.status,
        statusText: error.response?.data.msg,
      });
    }
    return json(error, { status: 500, statusText: "Something went wrong" });
  }
};