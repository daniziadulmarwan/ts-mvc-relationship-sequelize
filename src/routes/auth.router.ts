import { Router } from "express";
import IRouter from "./router.interface";
import authController from "../controllers/auth.controller";
import { register } from "../middlewares/validation/register.validate";
import { login } from "../middlewares/validation/login.validation";

class AuthRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  router(): void {
    this.route.get("/", authController.login);
    this.route.post("/signin", login, authController.signin);
    this.route.get("/register", authController.register);
    this.route.post("/signup", register, authController.signup);
    this.route.post("/signout", authController.signout);
  }
}

export default new AuthRouter().route;
