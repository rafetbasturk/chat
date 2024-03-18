import { IUser } from "../../../../types";

export enum ActionType {
  Begin = "LOGIN_BEGIN",
  Success = "LOGIN_SUCCESS",
  Error = "LOGIN_ERROR",
  Logout = "LOGOUT",
}

// export enum ActionType {
//   LoginStart,
//   LoginSuccess,
//   LoginError,
//   Logout,
// }

export interface LoginBegin {
  type: ActionType.Begin;
}

export interface LoginSuccess {
  type: ActionType.Success;
  payload: {
    user: IUser;
  };
}

export interface LoginError {
  type: ActionType.Error;
}

export interface Logout {
  type: ActionType.Logout;
}

export type AuthActions = LoginBegin | LoginSuccess | LoginError | Logout;
