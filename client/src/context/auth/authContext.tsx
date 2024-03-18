import { ReactNode, createContext, useReducer } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import apiFetch from "../../configs/axios";
import { authReducer } from "./authReducer";
import { initialState } from "./state";
import { ActionType } from "./actions";
import { IUser, UserResponse } from "../../../../types";

interface IContextProviderProps {
  children: ReactNode;
}

interface IContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: IUser | null;
  login: (user: IUser, endPoint: EndPoint) => Promise<void>;
  logout: () => void;
}

type EndPoint = "login" | "register";

// export const AuthContext = createContext<IContext>({
//   state: initialState,
//   login: () => Promise.resolve(),
//   logout() {},
// });

export const AuthContext = createContext<IContext | null>(null);

export default function AuthContextProvider({
  children,
}: IContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (user: IUser, endPoint: EndPoint) => {
    dispatch({ type: ActionType.Begin });

    try {
      const url = `/auth/${endPoint}`;
      const { data } = await apiFetch.post<UserResponse>(url, user);

      dispatch({
        type: ActionType.Success,
        payload: { user: data.user },
      });
      const text =
        endPoint === "login"
          ? "Login Successful."
          : "User Created! Redirecting...";
      toast.success(text);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
      dispatch({ type: ActionType.Error });
    }
  };

  const logout = () => {
    dispatch({ type: ActionType.Logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
