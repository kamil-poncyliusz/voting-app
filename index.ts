import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api-router";
import session from "express-session";
import sessionFileStore from "session-file-store";
const FileStore = sessionFileStore(session);

dotenv.config();

const port = process.env.PORT || 8080;
const fileStoreOptions = {};
const app = express();

app.use(
  session({
    store: new FileStore(fileStoreOptions),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World From the Typescript Server!");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
