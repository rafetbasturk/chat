import {
  Form,
  Link,
  Navigate,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { AuthState } from "../../../types";
import InputElement from "../components/InputElement";

export default function LoginPage() {
  const { isAuthenticated } = useLoaderData() as AuthState;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex w-full h-[100dvh] items-center justify-center">
      {isAuthenticated && <Navigate to="/" replace />}

      <Form
        className="w-full max-w-lg m-auto flex flex-col gap-2 p-2"
        method="post"
        replace
      >
        <FaSignInAlt className="w-8 h-8 self-center text-blue-400" />
        <h3 className="capitalize self-center font-semibold text-lg text-blue-400">
          login
        </h3>

        <InputElement
          type="email"
          name="email"
          autoComplete="email"
        />
        <InputElement
          type="password"
          name="password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="text-lg capitalize bg-gray-200 text-gray-950 rounded py-1 hover:bg-gray-900 hover:text-gray-200 disabled:text-gray-600 transition cursor-pointer active:scale-[0.98] mt-2"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Not a member yet?
          <Link
            to={"/register"}
            className="underline font-semibold ml-2 text-blue-400"
          >
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
}
