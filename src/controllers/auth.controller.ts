import { Request, Response } from "express";

class AuthController {
  login(req: Request, res: Response): void {
    res.render("pages/auth/signin");
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

  signup(req: Request, res: Response): void {
    res.send(req.body);
  }
}

export default new AuthController();
