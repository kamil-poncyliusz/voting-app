import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World From the Typescript Server!");
});
app.get("/api", (req, res) => {
  res.send("Hello World From the API!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
