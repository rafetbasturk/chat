import { StatusCodes } from "http-status-codes";
import { CustomError } from "./cutomError";

export class UnAuthenticatedError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message || "Unauthorized");
    this.statusCode = StatusCodes.UNAUTHORIZED;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, UnAuthenticatedError.prototype);
  }
}
