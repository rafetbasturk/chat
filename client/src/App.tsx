import { RouterProvider } from "react-router-dom";
import { router } from "./configs/router";
import Skeleton from "./components/skeletons/Skeleton";

const App = () => (
  <RouterProvider router={router} fallbackElement={<Skeleton />} />
);

export default App;
