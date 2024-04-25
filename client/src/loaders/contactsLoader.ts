import { json, redirect } from "react-router-dom";
import apiFetch from "../configs/axios";
import { IUser } from "../../../types";
import { AxiosError } from "axios";

interface ContactsResponse {
  contacts: IUser[];
}

export const getContacts = async () => {
  const url = `/users`;
  const { data } = await apiFetch.get<ContactsResponse>(url);
  return data;
};

export const contactsLoader = async () => {
  try {
    const data = await getContacts()
    return json(data.contacts, { status: 200 });
  } catch (error) {
    // console.log("CONTACTS LOADER", error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return redirect("/landing");
      }
      throw json(error, {
        status: error.response?.status,
        statusText: error.response?.data.msg,
      });
    }
    return json(error, { status: 500, statusText: "Something went wrong" });
  }
}