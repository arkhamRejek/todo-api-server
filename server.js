require("dotenv").config(); // always make sure that it's first import

import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
