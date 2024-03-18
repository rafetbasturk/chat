import { Outlet, useLoaderData } from "react-router-dom";
import { AuthState } from "../../../types";

const SharedLayout = () => {
  const data = useLoaderData() as AuthState
  return (
    <>
      <div className="flex items-center justify-center">
        <Outlet context={data} />
      </div>
    </>
  );
};
export default SharedLayout;
