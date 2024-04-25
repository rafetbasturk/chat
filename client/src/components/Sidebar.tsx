import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";

interface IProps extends PropsWithChildren {
  heading: string;
  showSearch?: boolean;
}

export default function Sidebar({ children, heading, showSearch }: IProps) {
  return (
    <aside className="relative flex flex-col justify-between w-96 shrink border-r border-gray-500">
      <div className="flex flex-col gap-3 border-b border-gray-500 p-4">
        <div className="flex items-center">
          <h3 className="capitalize grow text-center">{heading}</h3>
          <LogoutButton />
        </div>

        {showSearch && <SearchInput />}
      </div>

      <div className="px-4 py-2 grow overflow-y-scroll">{children}</div>

      <Navbar />
    </aside>
  );
}
