import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Contacts } from "../components/contactPage";

export default function ContactPage() {
  return (
    <>
      <Sidebar heading="contacts">
        <Contacts />
      </Sidebar>

      <main className="grow flex items-center justify-center">
        <Outlet />
      </main>
    </>
  );
}
