import express from "express";
import {
  createOption,
  createPoll,
  createVoter,
  deleteOption,
  readPoll,
  updateVoter,
} from "./api-request-handlers";

const apiRouter = express.Router();

apiRouter.get("/poll/:pollId", (req, res) => {
  const response = readPoll(req, res);
  return res.json(response);
});
apiRouter.post("/poll", (req, res) => {
  const response = createPoll(req, res);
  return res.json(response);
});
apiRouter.post("/poll/:pollId/voter", (req, res) => {
  const response = createVoter(req, res);
  return res.json(response);
});
apiRouter.patch("/poll/:pollId/voter/:voterId", (req, res) => {
  const response = updateVoter(req, res);
  return res.json(response);
});
apiRouter.post("/poll/:pollId/option", (req, res) => {
  const response = createOption(req, res);
  return res.json(response);
});
apiRouter.delete("/poll/:pollId/option/:optionId", (req, res) => {
  const response = deleteOption(req, res);
  return res.json(response);
});

export default apiRouter;
