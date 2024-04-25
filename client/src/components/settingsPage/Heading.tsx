import { PropsWithChildren } from "react";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface Props extends PropsWithChildren {
  isDisabled?: boolean;
}

export default function Heading({ children, isDisabled }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex border-b border-b-gray-500 px-10 py-6">
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="rounded-md w-32 px-4 flex justify-center items-center border border-gray-400 text-gray-400 hover:border-gray-200 hover:text-gray-200 hover:bg-gray-800"
      >
        <FaLeftLong />
      </button>
      <h3 className="grow text-center">{children}</h3>
      {isDisabled !== undefined ? (
        <button
          type="submit"
          className="text-blue-400 disabled:text-gray-300 disabled:cursor-not-allowed w-32"
          disabled={isDisabled}
        >
          Save Changes
        </button>
      ) : (
        <div className="w-32"></div>
      )}
    </div>
  );
}
