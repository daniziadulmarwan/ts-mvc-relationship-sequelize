import { Router } from "express";
import IRouter from "./router.interface";
import authController from "../controllers/auth.controller";

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
    this.route.post("/signup", authController.signup);
  }
}

export default new AuthRouter().route;
