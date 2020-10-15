import db from "../models";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/api/users", (req, res) => {
  return db.user
    .findAll()
    .then((users) => res.send(users))
    .catch((err) => {
      console.log("error occured", JSON.stringify(err));
      return res.send(err);
    });
});

userRoutes.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, age, email } = req.body;

  const payload = {
    first_name,
    last_name,
    age,
    email,
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
  return db.user
    .destroy({
      where: { id },
    })
    .then(() => res.send("user has been Deleted!"))
    .catch((err) => {
      console.log("error happened on creation", JSON.stringify(err));
    });
});

userRoutes.post("/api/register", (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  return db.user
    .create({ first_name, last_name, age, email, password })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log("error happened on creation", JSON.stringify(err));
      return res.status(400).send(err);
    });
});

userRoutes.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  return db.user
    .findOne({ where: { email } })
    .then((user) => {
      const passwordValid = user.password === password;

      if (passwordValid) return res.send(user);

      return res.status(400).send("bad password");
    })
    .catch(() => {
      return res.status(400).send("your username/password is incorrect");
    });
});

export { userRoutes };
