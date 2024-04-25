import { AuthState } from "../../types";
import apiFetch from "./configs/axios";

export const authStatus: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  login: async (user) => {
    const { data } = await apiFetch.post("/auth/login", user);

    authStatus.isAuthenticated = true;
    authStatus.currentUser = data.currentUser;
  },
  register: async (user) => {
    const { data } = await apiFetch.post("/auth/register", user);

    authStatus.isAuthenticated = true;
    authStatus.currentUser = data.currentUser;
  },
  getCurrentUser: async () => {
    try {
      const { data } = await apiFetch.get("/auth/getcurrentuser");

      return {
        isAuthenticated: true,
        currentUser: data.currentUser,
      };
    } catch (error) {
      // console.log("authStatus-getCurrentUser: ", error);

      return {
        isAuthenticated: false,
        currentUser: null,
      };
    }
  },
  logout: async () => {
    await apiFetch.get("auth/logout");

    authStatus.isAuthenticated = false;
    authStatus.currentUser = null;
  },
};
