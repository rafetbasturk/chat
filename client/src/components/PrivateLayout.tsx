import { Navigate, Outlet, useRouteLoaderData } from "react-router-dom";
import { IAuthenticated } from "../../../types";

const PrivateLayout = () => {
  const { isAuthenticated, currentUser } = useRouteLoaderData(
    "root"
  ) as IAuthenticated;

  return isAuthenticated ? (
    <div className="flex h-dvh overflow-hidden">
      <Outlet context={currentUser} />
    </div>
  ) : (
    <Navigate to="/landing" replace />
  );
};

export default PrivateLayout;
