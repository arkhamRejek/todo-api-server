import { Router } from "express";
import db from "../models";

const todoRoutes = Router();

todoRoutes.get("/api/todos", (_, res) => {
  return db.todo
    .findAll()
    .then((todo) => res.send(todo))
    .catch((err) => {
      console.log("error occurred", JSON.stringify(err));
      return res.send(err);
    });
});

todoRoutes.post("/api/todos", (req, res) => {
  const { name, description } = req.body;

  return db.todo
    .create({ name, description })
    .then(() => res.send(todo))
    .catch((err) => res.send(err));
});

todoRoutes.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  const payload = {
    name,
    description,
  };

  return db.todo
    .update(payload, {
      where: { id },
    })
    .then((todo) => res.send(todo))
    .catch((err) => res.send(err));
});

todoRoutes.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  return db.todo
    .destroy({ where: { id } })
    .then(() => res.send({}))
    .catch((err) => res.send(err));
});

export { todoRoutes };
