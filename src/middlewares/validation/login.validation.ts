import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const login = [
  body("username").notEmpty().withMessage("Username harus diisi"),
  body("password").notEmpty().withMessage("Password harus diisi"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().map((err) => {
        req.flash("message", `${err.msg}`);
      });
      req.flash("alert", "danger");
      return res.redirect("/");
    }

    next();
  },
];
