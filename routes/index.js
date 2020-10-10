import { Router } from "express";

import { todoRoutes } from "./todo";
import { userRoutes } from "./user";

const routes = Router();

routes.use(todoRoutes);
routes.use(userRoutes);

export { routes };
