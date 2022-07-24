import { Router } from "express";

interface IRouter {
  route: Router;
  router(): void;
}

export default IRouter;
