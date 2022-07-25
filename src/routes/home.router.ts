import { Router } from "express";
import IRouter from "./router.interface";
import homeController from "../controllers/home.controller";
import auth from "../middlewares/auth";

class HomeRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  router(): void {
    this.route.use(auth);
    this.route.get("/", homeController.index);
    this.route.get("/chart", homeController.chart);
  }
}

export default new HomeRouter().route;
