import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Conversations from "../components/Conversations";

export default function ConversationPage() {
  return (
    <>
      <Sidebar heading="conversations">
        <Conversations />
      </Sidebar>

      <main className="grow flex items-center justify-center">
        <Outlet />
      </main>
    </>
  );
}
