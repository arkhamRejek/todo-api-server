import { Router } from "express";
import { verifyAuth } from "./helper";
import db from "../models";

const todoRoutes = Router();

todoRoutes.get("/api/todos", verifyAuth, (req, res) => {
  const currentUser = req.user;
  return db.todo
    .findAll({
      where: {
        user_id: currentUser.id,
      },
    })
    .then((todo) => res.send(todo))
    .catch((err) => {
      console.log("error occurred", JSON.stringify(err));
      return res.send(err);
    });
});

todoRoutes.post("/api/todos", verifyAuth, (req, res) => {
  const currentUser = req.user;

  const { name, description } = req.body;

  console.log("body", req.body);

  console.log("i am current user", currentUser);

  return db.todo
    .create({ name, description, user_id: currentUser.id })
    .then(() => res.send(todo))
    .catch((err) => res.send(err));
});

todoRoutes.put("/api/todos/:id", verifyAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const currentUser = req.user;

  const payload = {
    name,
    description,
  };

  return db.todo
    .update(payload, {
      where: { id, user_id: currentUser.id },
    })
    .then((todo) => res.send(todo))
    .catch((err) => res.send(err));
});

todoRoutes.delete("/api/todos/:id", verifyAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const currentUser = req.user;

  return db.todo
    .destroy({ where: { id, user_id: currentUser.id } })
    .then(() => res.send({}))
    .catch((err) => res.send(err));
});

export { todoRoutes };
