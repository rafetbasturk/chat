import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export function attachCookie(res: Response, token: JwtPayload | string) {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
}
