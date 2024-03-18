import { LoaderFunctionArgs, json, redirect } from "react-router-dom";
import { AxiosError } from "axios";
import apiFetch from "../configs/axios";
import { IUser } from "../../../types";

export interface IConversation {
  participants: IUser[];
  messages: string[];
}

interface ConversationResponse {
  conversations: IConversation[];
}

export interface UserResponse {
  user: IUser;
}

export interface ConversationLoaderResponse {
  conversations: IConversation[];
  user: IUser | null;
}

const getConversations = async () => {
  const {
    data: { conversations },
  } = await apiFetch.get<ConversationResponse>("/conversations");
  return conversations;
};

const getUser = async (id: string) => {
  const {
    data: { user },
  } = await apiFetch.get<UserResponse>(`/users/${id}`);
  return user;
};

export const conversationLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const results = await Promise.allSettled([
      getConversations(),
      getUser(params.id as string),
    ]);

    const response: ConversationLoaderResponse = {
      conversations: [],
      user: null,
    };

    for (const result of results) {
      if (result.status === "fulfilled") {
        if (results.indexOf(result) === 0) {
          response.conversations = result.value as IConversation[];
        } else {
          response.user = result.value as IUser;
        }
      }
    }

    return response;
  } catch (error) {
    console.log("USER CONVERSATIONS LOADER", error);
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
