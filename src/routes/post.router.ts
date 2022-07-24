import { Router } from "express";
import IRouter from "./router.interface";

// controller
import postController from "../controllers/post.controller";

class PostRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  router(): void {
    this.route.get("/", postController.index);
  }
}

export default new PostRouter().route;
