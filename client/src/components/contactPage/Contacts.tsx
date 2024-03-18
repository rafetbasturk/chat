import useQueryParam from "../../hooks/useQueryParam";
import { Contact } from ".";
import { useLoaderData } from "react-router-dom";
import { IUser } from "../../../../types";

export default function Contacts() {
  const data = useLoaderData() as IUser[];
  const { query } = useQueryParam();

  const contacts = data?.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  return contacts?.map((contact) => (
    <Contact key={contact._id} contact={contact} />
  ));
}
