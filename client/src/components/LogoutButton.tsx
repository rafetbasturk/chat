import { useFetcher } from "react-router-dom";
import { RxExit } from "react-icons/rx";

export default function LogoutButton() {
  const fetcher = useFetcher();
  const isLoggingOut = fetcher.state !== "idle";

  return (
    <fetcher.Form method="post" action="/logout">
      <button
        className="p-2 rounded-full text-2xl text-blue-400 hover:bg-gray-600 disabled:bg-gray-300"
        disabled={isLoggingOut}
      >
        <RxExit />
      </button>
    </fetcher.Form>
  );
}
