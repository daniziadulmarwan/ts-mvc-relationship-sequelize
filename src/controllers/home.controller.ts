import { Request, Response } from "express";
import "../types";
const db = require("../database/models");

class HomeController {
  async index(req: Request, res: Response): Promise<any> {
    res.render("pages/dashboard/index", {
      active: "dashboard",
      user: req.session.user,
    });
  }

  async chart(req: Request, res: Response): Promise<Response> {
    try {
      const datas = await db.Student.findAll();
      return res.status(200).json({ data: datas });
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new HomeController();
