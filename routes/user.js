import { Router } from "express";
import db from "../models";

const userRoutes = Router();



userRoutes.post("/api/users/register", (req, res) => {
    const { first_name, last_name, email, password,  age } = req.body;

    const encrypted_password = password
  
    return db.todo
      .create({ first_name, last_name, email, age, encrypted_password})
      .then(() => res.send(todo))
      .catch((err) => res.send(err));
  });