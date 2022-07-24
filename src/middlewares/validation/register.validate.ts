import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const register = [
  body("fullname").notEmpty().withMessage("Fullname required"),
  body("username").notEmpty().withMessage("Username required"),
  body("password").notEmpty().withMessage("Password required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    next();
  },
];
