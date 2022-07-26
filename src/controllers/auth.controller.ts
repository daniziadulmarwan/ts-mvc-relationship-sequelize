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

  async signin(req: Request, res: Response): Promise<any> {
    try {
      const { username, password } = req.body;
      const user = await db.User.findOne({ username: username });
      if (!user) {
        req.flash("alert", "danger");
        req.flash("message", "User not found");
        return res.redirect("/");
      }

      const matchedPassword = bcrypt.compareSync(password, user.password);
      if (!matchedPassword) {
        req.flash("alert", "danger");
        req.flash("message", "Something wrong");
        return res.redirect("/");
      }

      req.session.user = {
        id: user.id,
        name: user.fullname,
        role: user.role,
      };

      res.app.locals.credential = {
        id: user.id,
        name: user.fullname,
        role: user.role,
      };

      return res.redirect("/dashboard");
    } catch (error) {
      req.flash("alert", "danger");
      req.flash("message", `${error}`);
      return res.redirect("/");
    }
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

  async signout(req: Request, res: Response): Promise<any> {
    try {
      req.session.destroy((err) => {
        if (err) console.log(err);
        return res.redirect("/");
      });
    } catch (error: any) {
      req.flash("alert", "danger");
      req.flash("message", `${error}`);
      return res.redirect("/");
    }
  }
}

export default new AuthController();
