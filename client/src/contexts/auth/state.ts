import { IUser } from "../../../../types";

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser: IUser | null;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  currentUser: null,
};
