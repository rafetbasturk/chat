import { StatusCodes } from "http-status-codes";
import { CustomError } from "./cutomError";

export class ForbiddenError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message || "Forbidden");
    this.statusCode = StatusCodes.FORBIDDEN;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
