import {
  Form,
  Link,
  Navigate,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { IAuthenticated } from "../../../types";

export default function LandingPage() {
  const { isAuthenticated } = useLoaderData() as IAuthenticated;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="flex h-[100dvh] items-center justify-center p-4">
      {isAuthenticated && <Navigate to="/" replace />}

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-red-300">You must log in to visit the app</h3>

        <p className="text-lg text-center">
          The Chat App project within the curriculum of the Odin Project.
        </p>

        <div className="flex gap-2">
          <Link to="/login" className="border rounded px-2 py-1">
            Login
          </Link>
          <Link to="/register" className="border rounded px-2 py-1">
            Register
          </Link>
          <Form method="post">
            <button
              type="submit"
              className="border rounded bg-gray-200 text-gray-950 disabled:bg-gray-50 px-2 py-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Demo User"}
            </button>
          </Form>
        </div>
      </div>
    </main>
  );
}
