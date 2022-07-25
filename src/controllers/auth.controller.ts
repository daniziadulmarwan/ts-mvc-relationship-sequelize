import { Request, Response } from "express";
import bcrypt from "bcrypt";
const db = require("../database/models");

class AuthController {
  login(req: Request, res: Response): void {
    const alertStatus = req.flash("alert");
    const alertMessage = req.flash("message");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("pages/auth/signin", { alert });
  }

  signin(req: Request, res: Response): void {
    res.send(req.body);
  }

  register(req: Request, res: Response): void {
    const alertStatus = req.flash("alert");
    const alertMessage = req.flash("message");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("pages/auth/signup", { alert });
  }

  async signup(req: Request, res: Response): Promise<any> {
    try {
      const { fullname, username, password } = req.body;
      const hashedPassword: any = bcrypt.hashSync(password, 10);
      await db.User.create({
        fullname,
        username,
        password: hashedPassword,
      });

      req.flash("alert", "success");
      req.flash("message", `Success register`);
      return res.redirect("/");
    } catch (error) {
      req.flash("alert", "danger");
      req.flash("message", `${error}`);
      return res.redirect("/register");
    }
  }
}

export default new AuthController();
