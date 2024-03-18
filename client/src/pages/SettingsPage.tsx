import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Settings from "../components/Settings";

export default function SettingsPage() {
  return (
    <>
      <Sidebar heading="settings">
        <Settings />
      </Sidebar>
      <main className="grow flex items-center justify-center">
        <Outlet />
      </main>
    </>
  );
}
