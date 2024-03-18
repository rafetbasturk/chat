import { StatusCodes } from "http-status-codes";
import { CustomError } from "./cutomError";

export class BadRequestError extends CustomError {
  statusCode: number;
  constructor(message: string) {
    super(message || "Bad request");
    this.statusCode = StatusCodes.BAD_REQUEST;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
