import { Request, Response, NextFunction } from "express";

export default function guest(req: Request, res: Response, next: NextFunction) {
  const userSession = req.session.user;
  if (userSession) {
    return res.redirect("/dashboard");
  }

  next();
}
