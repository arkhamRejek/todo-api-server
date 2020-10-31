import db from "../models";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const saltRounds = 10;

  return bcrypt
    .hash(password, saltRounds)
    .then(async (passwordHash) => {
      const user = await db.user.create({
        first_name,
        last_name,
        age,
        email,
        password: passwordHash,
      });

      return res.send(user);
    })
    .catch((err) => {
      console.log("error happened on creation", JSON.stringify(err));
      return res.status(400).send(err);
    });
});

userRoutes.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  return db.user
    .findOne({ where: { email } })
    .then(async (user) => {
      const passwordValid = await bcrypt.compare(password, user.password);

      if (passwordValid) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.send({ token });
      }

      return res.status(400).send("bad password");
    })
    .catch(() => {
      return res.status(400).send("your username/password is incorrect");
    });
});

export { userRoutes };
