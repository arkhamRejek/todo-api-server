import db from "../models";
import { Router } from "express";
const userRoutes = Router();
userRoutes.get("/api/users", (req, res) => {
  return db.User.findAll()
    .then((users) => res.send(users))
    .catch((err) => {
      console.log("error occured", JSON.stringify(err));
      return res.send(err);
    });
});
userRoutes.post("/api/users", (req, res) => {
  const { firstName, lastName, age, color } = req.body;
  return db.User.create({ firstName, lastName, age, color })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log("error happened on creation", JSON.stringify(err));
      return res.status(400).send(err);
    });
});
userRoutes.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, age } = req.body;
  const payload = {
    first_name,
    last_name,
    age,
  };
  return db.user
    .update(payload, {
      where: { id },
    })
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

userRoutes.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  return db.User.destroy({
    where: { id },
  })
    .then((User) => res.send("User has been Deleted!"))
    .catch((err) => {
      console.log("error happened on creation", JSON.stringify(err));
    });
});
export { userRoutes };
