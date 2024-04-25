import { useEffect } from "react";
import {
  ErrorResponse,
  useRouteError,
  useNavigate,
} from "react-router-dom";

export default function RouteError() {
  const error = useRouteError() as ErrorResponse;
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="h-dvh flex flex-col gap-2 items-center px-4">
      <p className="text-red-500">{error.status}</p>
      <p>{error.statusText}</p>
    </div>
  );
}
