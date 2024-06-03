import express from "express";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("Hello World From the Api!");
});
apiRouter.get("/poll/:pollId", (req, res) => {
  res.send(`Getting poll ${req.params.pollId}`);
});
apiRouter.post("/poll", (req, res) => {
  res.send("Creating a new poll");
});
apiRouter.post("/poll/:pollId/voter", (req, res) => {
  res.send(`Creating a new voter for poll ${req.params.pollId}`);
});
apiRouter.patch("/poll/:pollId/voter/:voterId", (req, res) => {
  res.send(
    `Updating voter ${req.params.voterId} for poll ${req.params.pollId}`
  );
});
apiRouter.post("/poll/:pollId/option", (req, res) => {
  res.send(`Creating a new option for poll ${req.params.pollId}`);
});
apiRouter.delete("/poll/:pollId/option/:optionId", (req, res) => {
  res.send(
    `Deleting option ${req.params.optionId} for poll ${req.params.pollId}`
  );
});

export default apiRouter;
