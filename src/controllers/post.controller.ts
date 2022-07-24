import { Request, Response } from "express";
import IController from "./controller.interface";
const db = require("../database/models");

class PostController implements IController {
  async index(req: Request, res: Response): Promise<any> {
    const data = await db.User.findOne({
      where: { id: 1 },
      include: db.Post,
    });
    console.log(data.fullname);
    console.log(data.Posts);
    console.log(data.Posts[0].title);
    return res.render("pages/posts/index", { active: "post" });
  }

  create(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

  post(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

  edit(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

  update(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

  destroy(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}

export default new PostController();
