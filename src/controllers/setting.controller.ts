import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IController from "./controller.interface";

class SettingController implements IController {
  index(req: Request, res: Response): void {
    return res.render("pages/setting/index", {
      active: "setting",
      user: req.session.user,
    });
  }

  create(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    throw new Error("Method not implemented.");
  }
  post(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    throw new Error("Method not implemented.");
  }
  edit(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    throw new Error("Method not implemented.");
  }
  update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    throw new Error("Method not implemented.");
  }
  destroy(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) {
    throw new Error("Method not implemented.");
  }
}

export default new SettingController();
