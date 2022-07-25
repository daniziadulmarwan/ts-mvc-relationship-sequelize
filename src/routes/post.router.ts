import { Router } from "express";
import IRouter from "./router.interface";

// controller
import postController from "../controllers/post.controller";
import auth from "../middlewares/auth";

class PostRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  router(): void {
    this.route.use(auth);
    this.route.get("/", postController.index);
  }
}

export default new PostRouter().route;
