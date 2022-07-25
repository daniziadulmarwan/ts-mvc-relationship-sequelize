import { Router } from "express";
import IRouter from "./router.interface";
import multer from "multer";
import os from "os";

// controller
import studentController from "../controllers/student.controller";
import auth from "../middlewares/auth";

class StudentRouter implements IRouter {
  public route: Router;

  constructor() {
    this.route = Router();
    this.router();
  }

  router() {
    this.route.use(auth);
    this.route.get("/", studentController.index);
    this.route.get("/create", studentController.create);
    this.route.post(
      "/",
      multer({ dest: os.tmpdir() }).single("image"),
      studentController.post
    );
    this.route.get("/:id/edit", studentController.edit);
    this.route.put(
      "/:id",
      multer({ dest: os.tmpdir() }).single("image"),
      studentController.update
    );
    this.route.delete("/:id", studentController.destroy);
  }
}

export default new StudentRouter().route;
