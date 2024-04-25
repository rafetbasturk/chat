import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Links from "../components/settingsPage/Links";

export default function SettingsPage() {
  return (
    <>
      <Sidebar heading="settings">
        <Links />
      </Sidebar>
      <main className="grow">
        <Outlet />
      </main>
    </>
  );
}
