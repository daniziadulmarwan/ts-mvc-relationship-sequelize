import { Router } from "express";
import IRouter from "./router.interface";
import authController from "../controllers/auth.controller";
import { register } from "../middlewares/validation/register.validate";

class AuthRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  router(): void {
    this.route.get("/", authController.login);
    this.route.post("/signin", authController.signin);
    this.route.get("/register", authController.register);
    this.route.post("/signup", register, authController.signup);
  }
}

export default new AuthRouter().route;
