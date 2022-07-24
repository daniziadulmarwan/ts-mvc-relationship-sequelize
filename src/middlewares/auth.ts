import { Request, Response, NextFunction } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/signin");
  }

  next();
}
