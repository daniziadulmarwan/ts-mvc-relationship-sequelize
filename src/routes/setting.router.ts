import { Router } from "express";
import settingController from "../controllers/setting.controller";
import IRouter from "./router.interface";

class SettingRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  router(): void {
    this.route.get("/", settingController.index);
  }
}

export default new SettingRouter().route;
