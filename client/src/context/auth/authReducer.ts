import { ActionType, AuthActions } from "./actions";
import { AuthState, initialState } from "./state";

export const authReducer = (
  state: AuthState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case ActionType.Begin:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case ActionType.Success:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentUser: action.payload.user,
      };
    case ActionType.Error:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentUser: null,
      };
    case ActionType.Logout:
      return initialState;
    default:
      throw new Error(`No action matching in AuthReducer`);
  }
};
