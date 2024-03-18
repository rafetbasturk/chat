import {
  ErrorResponse,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

export default function RouteError() {
  const error = useRouteError() as ErrorResponse;

  console.log(error);
  console.log(isRouteErrorResponse(error));
  

  return (
    <div className="flex flex-col gap-2 items-center px-4">
      <p className="text-red-500">{error.status}</p>
      <p>{error.statusText}</p>
    </div>
  );
}
