import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import apiInitWebRouter from "./routers/api.js";

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

apiInitWebRouter(app);

app.listen(PORT, () => {
  console.log("Back end running on the PORT = ", PORT);
});
