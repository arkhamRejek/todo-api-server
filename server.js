import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(routes);

app.listen(3000, () => {
  console.log(`Server is up on port ${port}`);
});
