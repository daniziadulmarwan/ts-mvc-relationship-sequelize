import { Request, Response } from "express";

interface IController {
  index(req: Request, res: Response): any;
  create(req: Request, res: Response): any;
  post(req: Request, res: Response): any;
  edit(req: Request, res: Response): any;
  update(req: Request, res: Response): any;
  destroy(req: Request, res: Response): any;
}

export default IController;
