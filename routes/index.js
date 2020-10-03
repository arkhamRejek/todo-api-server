import { todoRoutes } from "./todo";
import { Router } from "express";

const routes = Router();

routes.use(todoRoutes);

export { routes };
